import { Masonry, Card } from "antd";
import smartCrawSvg from "../assets/smart_craw_chonky_crab.svg";
import botInventory from "../assets/bot_inventory.png";
import botPlayground from "../assets/bot_playground.png";
import sandbox from "../assets/sandbox.jpg";
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

export default Home;
