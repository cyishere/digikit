/* eslint-disable import/no-anonymous-default-export */
import Sidebar from "./Sidebar";
import SidebarCard from "./SidebarCard";

export default {
  title: "Client/Sidebar",
  component: Sidebar,
};

const categories = [
  { id: "1", name: "Speaker" },
  { id: "2", name: "Headphone" },
  { id: "3", name: "Keyboard" },
];

const brands = [
  { name: "B&O" },
  { name: "GMK" },
  { name: "IQUNIX" },
  { name: "HHBK" },
];

export const Default = () => (
  <div style={{ width: 360 }}>
    <Sidebar>
      <SidebarCard title="Category" listContent={categories} />
      <SidebarCard title="Brand" listContent={brands} />
    </Sidebar>
  </div>
);
