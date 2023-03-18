import "./style.css"

import { Container, Select } from "@mantine/core"

function IndexPopup() {
  document.body.style.width = "15rem"
  document.body.style.height = "15rem"

  return (
    <Container p="xl">
      <Select
        label="どの言語に翻訳しますか？"
        defaultValue="EN"
        data={[
          { value: "EN", label: "英語" },
          { value: "KO", label: "韓国語" },
          { value: "ZH", label: "中国語" },
          { value: "JA", label: "日本語" }
        ]}
      />
    </Container>
  )
}

export default IndexPopup
