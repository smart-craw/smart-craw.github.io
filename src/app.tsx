import smartCrawImg from "./assets/smart_craw_crab_only.svg";

import asyncapiDoc from "./assets/asyncapi.json";
import "./app.css";
import { Layout, Menu, theme, Typography, Space } from "antd";
import { HomeOutlined, ReadOutlined, SlidersOutlined } from "@ant-design/icons";
import { Routes, Route, NavLink } from "react-router";
import { useLocation } from "react-router";
import Home from "./pages/Home";
import GetSmarted from "./pages/GetSmarted";
import ApiDocs from "./pages/ApiDocs";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

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
        <img src={smartCrawImg} />
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
            <Route
              path={quickStartRoute}
              element={<GetSmarted version={asyncapiDoc.info.version} />}
            />
            <Route
              path={apiRoute}
              // @ts-expect-error
              element={<ApiDocs asyncapiDoc={asyncapiDoc} />}
            />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}
