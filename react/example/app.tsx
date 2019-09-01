import React from 'react';
import JsonPretty from '../src';

const { useState } = React;

let CACHE = null as any;

const defaultData = {
  status: 200,
  error: '',
  data: [{
    news_id: 51184,
    title: 'iPhone X Review: Innovative future with real black technology',
    source: 'Netease phone'
  }, {
    news_id: 51183,
    title: 'Traffic paradise: How to design streets for people and unmanned vehicles in the future?',
    source: 'Netease smart'
  }, {
    news_id: 51182,
    title: 'Teslamask\'s American Business Relations: The government does not pay billions to build factories',
    source: 'AI Finance',
    members: ['Daniel', 'Mike', 'John']
  }]
};

const ExampleApp: React.FC = () => {
  const [jsonValue, setJsonValue] = useState(JSON.stringify(defaultData));
  const [data, setData] = useState(defaultData);
  const [singleValue, setSingleValue] = useState('res.error');
  const [multipleValue, setMultipleValue] = useState(['res.error']);

  const [options, setOptions] = useState({
    selectableType: 'single',
    showSelectController: true,
    showLength: false,
    showLine: true,
    showDoubleQuotes: true,
    highlightMouseoverNode: true,
    highlightSelectedNode: true,
    selectOnClickNode: true,
    path: 'res',
    deep: 3,
  }) as any;

  const [itemData, setItemData] = useState({});
  const [itemPath, setItemPath] = useState('');

  const handleClick = (path: string, data: any, treeName = '') => {
    console.log('click: ', path, data, treeName)
    setItemPath(path);
    setItemData(!data ? data.toString() : data); // 处理 data = null 的情况
  };

  const handleChange: any = (newVal: any, oldVal: any) => {
    if (options.selectableType === 'single') {
      setSingleValue(newVal);
    } else if (options.selectableType === 'multiple') {
      setMultipleValue(newVal);
    }
  };

  const Checkbox = ({ id, label, value }: any) => (
    <div>
      <label>{label || id}</label>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => setOptions({ ...options, [id]: !value })}
      />
    </div>
  );

  const Select = ({ id, label, value, options: selectOptions, onChange }: any) => (
    <div>
      <label>{label || id}</label>
      <select
        value={value}
        onChange={(e) => {
          const newValue = e.target.value;
          setOptions({ ...options, [id]: newValue });
          onChange && onChange(newValue);
        }}
      >
        {
          selectOptions.map((item: any) => (
            <option key={item.value} value={item.value}>{item.label || item.value}</option>)
          )
        }
      </select>
    </div>
  );

  const JsonInput = () => (
    <textarea
      value={jsonValue}
      onChange={(e) => {
        const newValue = e.target.value;
        try {
          CACHE = JSON.parse(newValue);
          setData(CACHE)
        } catch (err) {
          setData(CACHE || data);
        }
        setJsonValue(e.target.value);
      }}
    />
  )

  const currentValue = options.selectableType === 'multiple' ? multipleValue : singleValue;

  return (
    <div className="example">
      <div className="example-box">
        <h2 className="title">EXAMPLE 1</h2>
        <div className="block">
          <h3>JSON:</h3>
          <JsonInput />

          <h3>Options:</h3>
          <div className="options">
            <Checkbox id="showLength" value={options.showLength} />
            <Checkbox id="showLine" value={options.showLine} />
            <Checkbox id="showDoubleQuotes" value={options.showDoubleQuotes} />
            <Checkbox id="highlightMouseoverNode" value={options.highlightMouseoverNode} />
            <Select
              id="deep"
              value={options.deep}
              options={[{
                value: 2,
              }, {
                value: 3,
              }, {
                value: 4,
              }]}
            />
          </div>
        </div>
        <div className="block">
          <h3>json-pretty:</h3>
          <JsonPretty
            data={data}
            deep={options.deep}
            showDoubleQuotes={options.showDoubleQuotes}
            showLength={options.showLength}
            showLine={options.showLine}
            highlightMouseoverNode={options.highlightMouseoverNode}
            onClick={handleClick}
          />
        </div>
      </div>

      <div className="example-box">
        <h2 className="title">EXAMPLE 2</h2>
        <div className="block">
          <h3>JSON:</h3>
          <JsonInput />

          <h3>Options:</h3>
          <div className="options">
            <Select
              id="selectableType"
              value={options.selectableType}
              options={[{
                label: '-',
                value: '',
              }, {
                value: 'single',
              }, {
                value: 'multiple',
              }]}
              onChange={(newVal: string) => {
                if (newVal === 'single') {
                  setSingleValue('res.error');
                } else if (newVal === 'multiple') {
                  setMultipleValue(['res.error', 'res.data[0].title']);
                }
              }}
            />
            <Checkbox id="showSelectController" value={options.showSelectController} />
            <Checkbox id="selectOnClickNode" value={options.selectOnClickNode} />
            <Checkbox id="showLength" value={options.showLength} />
            <Checkbox id="showLine" value={options.showLine} />
            <Checkbox id="showDoubleQuotes" value={options.showDoubleQuotes} />
            <Checkbox id="highlightMouseoverNode" value={options.highlightMouseoverNode} />
            <Checkbox id="highlightSelectedNode" value={options.highlightSelectedNode} />
            <Select
              id="deep"
              value={options.deep}
              options={[{
                value: 2,
              }, {
                value: 3,
              }, {
                value: 4,
              }]}
            />
 
            <div>
              <label>path</label>
              <input type="text" v-model="path" />
            </div>

          </div>
          <h3>value:</h3>
          <div>
            {Array.isArray(currentValue) ? (
              `[${currentValue.join(', ')}]`
            ) : currentValue}
          </div>
          <h3>Current Click:</h3>
          <div>path: {itemPath}</div>
          <div>data: <pre>{JSON.stringify(itemData)}</pre></div>
        </div>
        <div className="block">
          <h3>json-pretty:</h3>
          <JsonPretty
            value={currentValue}
            data={data}
            path={options.path}
            deep={options.deep}
            showDoubleQuotes={options.showDoubleQuotes}
            showLength={options.showLength}
            showLine={options.showLine}
            highlightMouseoverNode={options.highlightMouseoverNode}
            highlightSelectedNode={options.highlightSelectedNode}
            selectOnClickNode={options.selectOnClickNode}
            selectableType={options.selectableType}
            showSelectController={options.showSelectController}
            pathSelectable={((path: string, data: any) => typeof data !== 'number')}
            onClick={handleClick}
            onChange={handleChange}
          />
        </div>
      </div>

      <a style={{position: 'fixed', right: 0, top: 0}} href="https://github.com/leezng/vue-json-pretty" target="_blank" rel="noreferrer noopener">
        <img style={{position: 'absolute', top: 0, right: 0, border: 0}} src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png" />
      </a>
    </div>
  );
};

export default ExampleApp;
