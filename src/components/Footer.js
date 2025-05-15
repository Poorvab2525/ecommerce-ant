import React from "react";
import { Layout, Typography, Space } from "antd";
import { GithubOutlined } from "@ant-design/icons";

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

const Footer = () => {
return (
<AntFooter style={{ textAlign: "center", padding: "24px 50px", background: "#f0f2f5" }}>
<Space direction="vertical" size="small">
<Text style={{ fontSize: "16px" }}>
Made with <span role="img" aria-label="heart">❤️</span> by <strong>Poorva Bhagwat</strong>
</Text>
<Link
href="https://github.com/Poorvab2525"
target="_blank"
style={{ fontSize: "20px", color: "#000" }}
>
<GithubOutlined />
</Link>
</Space>
</AntFooter>
);
};

export default Footer;