import * as React from 'https://unpkg.com/react@17/umd/react.development.js';
import * as ReactDOM from 'https://unpkg.com/react-dom@17/umd/react-dom.development.js';

const defaultContent = `
  # Hello
  ## Hello
  ### Hello

  \`<div>Inline code</div>\`

  \`\`\`
  const multipleLineCode = (param) => {
    if(param) {
      return param
    }
  }
  \`\`\`

  **Some bold text**

  [link]

  > Block Quote

  1. First list item
  2. Second list item
`;

marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  },
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

const Editor = ({ content, handleTextareaChange }) => (
  <textarea value={content} onChange={handleTextareaChange} id='editor' />
);

const Previewer = ({ content }) => (
  <div
    id='preview'
    dangerouslySetInnerHTML={{
      __html: marked(content, { renderer: renderer }),
    }}
  />
);

const App = () => {
  const [content, setContent] = React.useState(defaultContent);

  const handleTextareaChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <div class='main'>
      <Editor content={content} handleTextareaChange={handleTextareaChange} />
      <Previewer content={content} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('app'));
