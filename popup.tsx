import "./style.css"

function IndexPopup() {
  document.body.style.width = "15rem"
  document.body.style.height = "15rem"

  return (
    <div className="flex h-screen items-center justify-center">
      <p>どの言語に翻訳しますか？</p>
      <select name="target_lang">
        <option value="EN">英語</option>
        <option value="KO">韓国語</option>
        <option value="ZH">中国語</option>
        <option value="JA">日本語</option>
      </select>
    </div>
  )
}

export default IndexPopup
