import {
  Typography,
  Space,
  Card,
  Descriptions,
  Progress,
  Anchor,
  Row,
  Col,
} from "antd";
import { CodeHighlighter } from "@ant-design/x";
import { generate, type JsonSchema } from "json-schema-faker";
import { useEffect, useState } from "preact/hooks";
const { Title, Paragraph } = Typography;
type InfoProps = {
  title: string;
  version: string;
  description: string;
};
type Server = {
  host: string;
  protocol: string;
  description: string;
};

type Message = {
  name: string;
  title?: string;
  contentType: string;
  payload: JsonSchema; //object is a json schema
};
type Messages = {
  send: Record<string, Message>;
  receive: Record<string, Message>;
};

type AsyncProps = {
  info: InfoProps;
  server: Server;
  messages: Messages;
};
type Props = {
  asyncapiDoc: AsyncProps;
};

const CodeCard = ({
  name,
  payload,
  title,
}: Pick<Message, "name" | "payload" | "title">) => {
  const [generatedPayload, setGeneratedPayload] = useState<unknown | undefined>(
    undefined,
  );
  useEffect(() => {
    generate(payload).then(setGeneratedPayload);
  }, [payload]);
  return (
    <Card id={name} title={`${name}${title ? `: ${title}` : ""}`}>
      <CodeHighlighter lang="json" header="Schema">
        {JSON.stringify(payload, null, 2)}
      </CodeHighlighter>
      {generatedPayload ? (
        <CodeHighlighter lang="json" header="Example">
          {JSON.stringify(generatedPayload, null, 2)}
        </CodeHighlighter>
      ) : (
        <Progress />
      )}
    </Card>
  );
};
const ApiDocs = ({ asyncapiDoc }: Props) => {
  const { info, server, messages } = asyncapiDoc;
  const { title, version, description } = info;
  const apiMenuItems = [
    {
      key: "Send",
      title: "Send",
      href: "#Send",
      children: Object.values(messages.send).map(({ name }) => ({
        key: name,
        href: `#${name}`,
        title: name,
      })),
    },
    {
      key: "Receive",
      title: "Receive",
      href: "#Receive",
      children: Object.values(messages.receive).map(({ name }) => ({
        key: name,
        href: `#${name}`,
        title: name,
      })),
    },
  ];
  const handleClick = (
    e: Event,
    link: {
      title: React.ReactNode;
      href: string;
    },
  ) => {
    e.preventDefault(); // stop Ant Design from changing the hash
    const target = document.getElementById(link.href.replace("#", ""));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Row style={{ margin: 16 }}>
      <Col span={18}>
        <Title level={3}>
          Api Docs for {title}: version {version}
        </Title>
        <Paragraph>{description}</Paragraph>
        <Title level={3}>Servers</Title>

        <Descriptions
          items={Object.entries(server).map(([key, value]) => ({
            label: key,
            children: value,
          }))}
        />
        <Title level={3}>Messages</Title>
        <Title id="Send" level={4}>
          Send
        </Title>
        <Space vertical style={{ display: "flex" }}>
          {Object.values(messages.send).map(({ name, title, payload }) => (
            <CodeCard name={name} payload={payload} title={title} />
          ))}
        </Space>
        <Title id="Receive" level={4}>
          Receive
        </Title>
        <Space vertical style={{ display: "flex" }}>
          {Object.values(messages.receive).map(({ name, title, payload }) => (
            <CodeCard name={name} payload={payload} title={title} />
          ))}
        </Space>
      </Col>
      <Col span={6}>
        <Anchor items={apiMenuItems} onClick={handleClick} />
      </Col>
    </Row>
  );
};
export default ApiDocs;
