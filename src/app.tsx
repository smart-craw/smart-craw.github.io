import { useState } from "preact/hooks";
import smartCrawImg from "./assets/smart_craw_crab_only.svg";
import smartCrawSvg from "./assets/smart_craw_chonky_crab.svg";
import screenshot from "./assets/ui.png";
import "./app.css";
import { Carousel, Layout, Menu, theme, Image, Typography, Space } from "antd";
import { HomeOutlined, ReadOutlined, SlidersOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
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
              Smart Craw
            </Title>
          </Space>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Title level={4}>Get Smart! Its not Claw, its Craw!</Title>
          <Text>
            Create, test, and schedule agents. Use agents as an orchestrator, or
            use an external orchestrator to call agents: regardless of your
            workflow, Smart Craw has you covered!
          </Text>
          <Carousel arrows infinite={false}>
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
          </Carousel>
        </Content>
      </Layout>
    </Layout>
  );
}
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
