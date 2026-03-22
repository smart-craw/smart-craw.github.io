import smartCrawImg from "./assets/smart_craw_crab_only.svg";
import smartCrawSvg from "./assets/smart_craw_chonky_crab.svg";
import screenshot from "./assets/ui.png";
import "./app.css";
import {
  Layout,
  Menu,
  theme,
  Image,
  Typography,
  Space,
  Masonry,
  Card,
} from "antd";
import { HomeOutlined, ReadOutlined, SlidersOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const cardData = [
  {
    img: smartCrawSvg,
    title: "Its not Claw, its Craw!",
    description:
      "Create, test, and schedule agents. Use agents as an orchestrator, or use an external orchestrator to call agents: regardless of your workflow, Smart Craw has you covered!",
  },
  {
    img: screenshot,
    title: "Intuitive UI",
    description: "UI to create, view, schedule, start, and stop bot execution",
  },
  {
    img: screenshot,
    title: "Test your bots!",
    description: "Chat interface playground to test and explore",
  },
  {
    img: screenshot,
    title: "Sandboxed by default",
    description:
      "Full control over access: dockerized by default, with explicit volume mounts for workstation data access",
  },
];
export function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider breakpoint="sm">
        <Image src={smartCrawImg} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "Home",
            },
            {
              key: "2",
              icon: <ReadOutlined />,
              label: "Get smarted!",
            },
            {
              key: "3",
              icon: <SlidersOutlined />,
              label: "Client API",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Space align="center">
            <Title
              level={3}
              style={{
                textAlign: "center",
                marginTop: 0,
                marginBottom: 0,
                marginLeft: 16,
              }}
            >
              Get Smart. Get Smart Craw.
            </Title>
          </Space>
        </Header>
        <Content
          style={{
            marginTop: 16,
            //margin: "24px 16px",
            //padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Masonry
            columns={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 4 }}
            //gutter={{ xs: 8, sm: 12, md: 16 }}
            gutter={0}
            items={cardData.map((data, index) => ({
              key: `item-${index}`,
              data: data,
            }))}
            itemRender={({ data }) => (
              <Card
                style={{ margin: 16 }}
                size="small"
                cover={<img alt="logo" src={data.img} />}
              >
                <Card.Meta title={data.title} description={data.description} />
              </Card>
            )}
          />
        </Content>
      </Layout>
    </Layout>
  );
}

/*<Title level={4}>Get Smart! Its not Claw, its Craw!</Title>
<Text>
  Create, test, and schedule agents. Use agents as an orchestrator, or
  use an external orchestrator to call agents: regardless of your
  workflow, Smart Craw has you covered!
</Text> */

/*<Space align="center">
  <Button
    type="text"
    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    onClick={() => setCollapsed(!collapsed)}
    style={{
      fontSize: "16px",
      width: 64,
      height: 64,
    }}
  />

</Space> */
/*<Carousel arrows infinite={false}>
  <div>
    <Image src={smartCrawSvg} />
  </div>
  <div>
    <Image src={screenshot} />
    <Text>
      UI to create, view, schedule, start, and stop bot execution
    </Text>
  </div>
  <div>
    <Image src={screenshot} />
    <Text>Chat interface playground to test and explore</Text>
  </div>
  <div>
    <Image src={smartCrawSvg} />
    <Text>
      Full control over access: docker-ized by default, with explicit
      volume mounts for workstation data access
    </Text>
  </div>
</Carousel> */

/*<Card size="small" cover={<img alt="logo" src={smartCrawSvg} />}>
  <Card.Meta
    title="Get Smart! Its not Claw, its Craw!"
    description="Create, test, and schedule agents. Use agents as an orchestrator, or use an external orchestrator to call agents: regardless of your workflow, Smart Craw has you covered!"
  />
</Card>
<Card
  size="small"
  cover={<img alt="screenshot" src={screenshot} />}
>
  <Card.Meta
    title="Intuitive UI"
    description="UI to create, view, schedule, start, and stop bot execution"
  />
</Card>
<Card
  size="small"
  cover={<img alt="screenshot" src={screenshot} />}
>
  <Card.Meta
    title="Test your bots!"
    description="Chat interface playground to test and explore"
  />
</Card>
<Card
  size="small"
  cover={<img alt="screenshot" src={screenshot} />}
>
  <Card.Meta
    title="Sandboxed by default"
    description="Full control over access: docker-ized by default, with explicit volume mounts for workstation data access"
  />
</Card>
</Masonry> */
