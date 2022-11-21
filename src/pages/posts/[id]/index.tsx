import { Button, Col, Form, Input, Row, Spin, Typography, Upload } from 'antd'
import { RcFile } from 'antd/lib/upload'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import PostVersions from '~/components/post-version'
import { RoutePath } from '~/constants/portal-routes'
import IPost from '~/interfaces/post-interface'
import { createPageViewAction } from '~/store/posts/create-pageview-action'
import { getPostAction } from '~/store/posts/get-post-action'
import { getPostVersionAction } from '~/store/posts/get-post-version-action'
import { initialState } from '~/store/posts/initial-state'
import { updatePostAction } from '~/store/posts/update-post-action'
import { RootState, useAppDispatch, useAppSelector } from '~/store/store-config'
import TemplateOnline from '~/template/online'

const { Title, Link } = Typography
const { Item, useForm } = Form
const { TextArea } = Input
const { Group } = Button

type ChangeVersionType = {
  isAnotherVersion: boolean
  versionBeingViewed: IPost | null
}

const PostsPage = () => {
  const dispatch = useAppDispatch()
  const route = useRouter()
  const { id } = route.query

  const isPending = useAppSelector((state: RootState) => state.posts.isPending)
  const versionList = useAppSelector((state: RootState) => state.posts.versionList.versions)
  const post = useAppSelector((state: RootState) => state.posts.current)
  const user = useAppSelector((state: RootState) => state.user.current)

  const [version, setVersion] = useState<ChangeVersionType>({
    isAnotherVersion: false,
    versionBeingViewed: initialState.current,
  })

  const [form] = useForm<IPost>()
  const [file, setFile] = useState<string | ArrayBuffer | null>('')

  const convertToBase64 = (file: RcFile) => {
    const reader = new FileReader()
    reader.onload = function (e) {
      setFile(this.result)
    }
    reader.readAsDataURL(file)

    // Prevent upload
    return false
  }

  const handleSubmit = async () => {
    const data = form.getFieldsValue()
    if (version.isAnotherVersion) {
      if (!confirm('Você está visualizando uma versão antiga, se continuar, será gerado uma nova versão com estes mesmos dados. Deseja continuar?')) {
        return false
      }
      data.featureImageURL = version.versionBeingViewed?.featureImageURL || file
    } else {
      data.featureImageURL = file
    }
    data.user_name = user.name || 'Anônimo'
    data.version = getNextVersion(versionList)

    const { payload } = await dispatch(updatePostAction(data))

    if (payload) {
      await dispatch(getPostAction(id as string))
      await dispatch(getPostVersionAction(id as string))
    }
  }

  useEffect(() => {
    if (id) {
      dispatch(getPostAction(id as string))
      dispatch(getPostVersionAction(id as string))
    }
  }, [id])

  useEffect(() => {
    setFile(post.featureImageURL)
    form.setFieldsValue(post)
  }, [post])

  const getNextVersion = (list: IPost[]): number => Math.max(...list.map(o => o.version)) + 1

  const setViewVersion = (postVersion: IPost) => {
    if (postVersion.version === post.version) {
      setFile(post.featureImageURL)
      setVersion({
        isAnotherVersion: false,
        versionBeingViewed: post,
      })
    } else {
      setFile(postVersion.featureImageURL)
      setVersion({
        isAnotherVersion: true,
        versionBeingViewed: postVersion,
      })
    }

    form.setFieldsValue({
      title: postVersion.title,
      description: postVersion.description,
      featureImageURL: postVersion.featureImageURL,
    })
  }

  return (
    <TemplateOnline>
      <Spin spinning={isPending}>
        <Row gutter={20}>
          <Col xs={24} sm={12} md={18}>
            <Title>
              Editar Artigo
              {version.isAnotherVersion && <small>visualizando a versão {version.versionBeingViewed?.version}</small>}
            </Title>
            <Form form={form} layout="vertical">
              <Row gutter={20}>
                {file && (
                  <Col>
                    <img src={file as string} alt="" width={200} style={{ marginBottom: '20px' }} />
                  </Col>
                )}
                <Col>
                  <Item name="featureImageURL" label="Imagem de destaque">
                    <Upload
                      maxCount={1}
                      beforeUpload={convertToBase64}
                      onRemove={() => setFile('')}
                      progress={{
                        strokeColor: {
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        },
                        strokeWidth: 3,
                        format: percent => percent && `${parseFloat(percent.toFixed(2))}%`,
                      }}
                    >
                      <Button type="dashed">adicionar imagem</Button>
                    </Upload>
                  </Item>
                </Col>
              </Row>
              <Item name="title" label="Título">
                <Input />
              </Item>
              <Item name="description" label="Corpo do artigo">
                <TextArea rows={10} />
              </Item>
              <Group>
                <Button onClick={() => route.push(RoutePath.user.posts)}>voltar</Button>
                <Button htmlType="reset">limpar</Button>
                <Button type="primary" onClick={handleSubmit}>
                  salvar
                </Button>
              </Group>
              <Item name="_id">
                <Input type="hidden" />
              </Item>
            </Form>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Title level={3}>Versões</Title>
            <PostVersions onChange={setViewVersion} />
          </Col>
        </Row>
      </Spin>
    </TemplateOnline>
  )
}

export default PostsPage
