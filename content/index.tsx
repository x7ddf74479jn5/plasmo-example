import cssText from "data-text:~style.css"
import { createRoot } from "react-dom/client"

import { Content } from "./Content"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

type Props = {
  translatedText: string
  originalText: string
  targetLang: string
}

const Main = ({ translatedText, originalText, targetLang }: Props) => {
  return (
    <div className="absolute w-full left-0 top-0 z-50">
      <div className="absolute left-4 top-4 z-50">
        <Content
          translatedText={translatedText}
          originalText={originalText}
          targetLang={targetLang}
        />
      </div>
    </div>
  )
}

const container = document.createElement("my-extension-root")
document.body.after(container)
createRoot(container).render(
  <Main
    translatedText={"ここに翻訳したテキストが入る"}
    originalText={"ここに翻訳前のテキストが入る"}
    targetLang={"JA"}
  />
)
