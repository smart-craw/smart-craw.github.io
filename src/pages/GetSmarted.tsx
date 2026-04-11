import { Typography, Alert, Space } from "antd";
import { CodeHighlighter } from "@ant-design/x";
const { Title, Paragraph } = Typography;
type Props = {
  version: string;
};
const GetSmarted = ({ version }: Props) => {
  return (
    <Space
      vertical
      style={{ display: "flex", marginLeft: 16, marginRight: 16 }}
    >
      <Title level={3}>Quick Start</Title>
      <Paragraph>
        Smart Craw uses local (same physical device as where Smart Craw runs) to
        store "memories" and metadata about bots. While Smart Craw is able to
        access code and other local files, it is recommended to use a separate
        sandbox MPC for code interactions. Smart Craw is recommended to run
        inside a Docker container. Only mount volumes that contain files that
        you aren't afraid to lose/modify.
      </Paragraph>
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
  ghcr.io/smart-craw/smart-craw:${version}
        `}
      </CodeHighlighter>
      <Paragraph>If using a remote (eg Claude) LLM:</Paragraph>
      <CodeHighlighter lang="bash">
        {String.raw`
# if running remote LLM (eg Sonnet)
docker run -p 8000:8000 -e ANTHROPIC_BASE_URL=[yourllmurl] \
  -e ANTHROPIC_AUTH_TOKEN=[yourauthtoken] \
  -e ANTHROPIC_API_KEY=[yourapikey] \
  -v $(pwd):/app/db \
  -v $(pwd)/memory:/app/smart-craw-server/memory \
  --add-host=host.docker.internal:host-gateway \
  ghcr.io/smart-craw/smart-craw:${version}
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
          <li>ANTHROPIC_API_KEY (defaults to "sk-local-dummy")</li>
          <li>LOG_LEVEL (defaults to "info")</li>
          <li>
            START_THINK_TOKEN (start token for thinking, defaults to
            "&lt;think&gt;")
          </li>
          <li>
            END_THINK_TOKEN (start token for thinking, defaults to
            "&lt;/think&gt;")
          </li>
        </ul>
      </Paragraph>
    </Space>
  );
};

export default GetSmarted;
