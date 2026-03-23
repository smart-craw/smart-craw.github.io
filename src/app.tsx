import smartCrawImg from "./assets/smart_craw_crab_only.svg";
import smartCrawSvg from "./assets/smart_craw_chonky_crab.svg";
import botInventory from "./assets/bot_inventory.png";
import botPlayground from "./assets/bot_playground.png";
import sandbox from "./assets/sandbox.jpg";
import { CodeHighlighter } from "@ant-design/x";
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
  Divider,
  Alert,
} from "antd";
import { HomeOutlined, ReadOutlined, SlidersOutlined } from "@ant-design/icons";
import { Routes, Route, NavLink } from "react-router";
import { useLocation } from "react-router";
const { Header, Sider, Content } = Layout;
const { Title, Paragraph } = Typography;

const cardData = [
  {
    img: smartCrawSvg,
    title: "Its not Claw, its Craw!",
    description:
      "Create, test, and schedule agents. Use agents as an orchestrator, or use an external orchestrator to call agents: regardless of your workflow, Smart Craw has you covered!",
  },
  {
    img: botInventory,
    title: "Intuitive UI",
    description: "UI to create, view, schedule, start, and stop bot execution",
  },
  {
    img: botPlayground,
    title: "Test your bots!",
    description: "Chat interface playground to test and explore",
  },
  {
    img: sandbox,
    title: "Sandboxed by default",
    description:
      "Full control over access: dockerized by default, with explicit volume mounts for workstation data access",
  },
];

const Home = () => {
  return (
    <Masonry
      columns={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 4 }}
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
  );
};

const GetSmarted = () => {
  return (
    <div style={{ margin: 16 }}>
      <Title level={3}>Quick Start</Title>
      <Paragraph>
        Smart Craw uses local (same physical device as where Smart Craw runs) to
        store "memories" and metadata about bots. While Smart Craw is able to
        access code and other local files, it is recommended to use a separate
        sandbox MPC for code interactions. Smart Craw is recommended to run
        inside a Docker container. Only mount volumes that contain files that
        you aren't afraid to lose/modify.
      </Paragraph>
      <Divider />
      <Alert
        type="warning"
        title="Caution!"
        showIcon
        description={`
This is intended for local and trusted networks. An ideal setup would be to run this and access it on a local workstation. The LLM service can be hosted elsewhere.

If you run this on a Raspberry Pi and access the UI "remotely" it is strongly recommended to set static IPs and block all traffic except from your workstation. Similarly, if you want to access this from your phone on your local network, have your local router assign a static IP to your phone and block all traffic except from your phone.

I may at some point set up authentication which would allow exposure to a wider array of (LAN) endpoints, but I still would urge caution and tight network restrictions.

Under no circumstances should you host this on a cloud system or expose your ports outside of your LAN.`}
      />
      <Paragraph>Store memories for later use:</Paragraph>
      <CodeHighlighter lang="bash">
        {`
mkdir memory
          `}
      </CodeHighlighter>
      <Paragraph>
        Run docker container, mounting current directory for the persistent
        storage and the memory directory for notes:
      </Paragraph>
      <CodeHighlighter lang="bash">
        {String.raw`
# if running local Ollama.  --add-host is optional on Mac/Windows
docker run -p 8000:8000 -v $(pwd):/app/db \
  -v $(pwd)/memory:/app/smart-craw-server/memory \
  --add-host=host.docker.internal:host-gateway  \
  ghcr.io/smart-craw/smart-craw:v0.0.4
        `}
      </CodeHighlighter>
      <Paragraph>If using a remote (eg Claude) LLM:</Paragraph>
      <CodeHighlighter lang="bash">
        {String.raw`
# if running local Ollama.  --add-host is optional on Mac/Windows
docker run -p 8000:8000 -e ANTHROPIC_BASE_URL=[yourllmurl] \
  -e ANTHROPIC_AUTH_TOKEN=[yourauthtoken] \
  -e ANTHROPIC_API_KEY=[yourapikey] \
  -v $(pwd):/app/db \
  -v $(pwd)/memory:/app/smart-craw-server/memory \
  --add-host=host.docker.internal:host-gateway \
  ghcr.io/smart-craw/smart-craw:v0.0.4
          `}
      </CodeHighlighter>
      <Title level={4}>Full set of Docker environment variables</Title>
      <Paragraph>
        <ul>
          <li>
            ANTHROPIC_BASE_URL (defaults to "http://host.docker.internal:11434",
            local Ollama)
          </li>
          <li>ANTHROPIC_AUTH_TOKEN (defaults to "ollama")</li>
          <li>
            ANTHROPIC_API_KEY (defaults to "sk-local-dummy") LOG_LEVEL (defaults
            to "info")
          </li>
          <li>LOG_LEVEL (defaults to "info")</li>
        </ul>
      </Paragraph>
    </div>
  );
};

//const routes = ["/", "/quickstart", "/api"];
const homeRoute = "/";
const quickStartRoute = "/quickstart";
const apiRoute = "/api";

export function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  const currentKey = location.pathname;
  return (
    <Layout>
      <Sider breakpoint="sm">
        <Image src={smartCrawImg} />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[currentKey]}
          items={[
            {
              key: homeRoute,
              icon: <HomeOutlined />,
              label: <NavLink to={homeRoute}>Home</NavLink>,
            },
            {
              key: quickStartRoute,
              icon: <ReadOutlined />,
              label: <NavLink to={quickStartRoute}>Get smarted!</NavLink>,
            },
            {
              key: apiRoute,
              icon: <SlidersOutlined />,
              label: <NavLink to={apiRoute}>Client API</NavLink>,
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
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path={homeRoute} element={<Home />} />
            <Route path={quickStartRoute} element={<GetSmarted />} />
            <Route path={apiRoute} element={<Home />} />
          </Routes>
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
