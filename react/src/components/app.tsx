import React from 'react';
import SimpleText from './simple-text';
import Checkbox from './checkbox';
import Radio from './radio';
import BracketsLeft from './brackets-left';
import BracketsRight from './brackets-right';
import { getDataType } from '../utils';

const { useState, useEffect } = React;

export interface Props {
  /* outer props */
  // 当前树的数据
  data: any;
  // 定义树的深度, 大于该深度的子树将不被展开
  deep?: number;
  // 显示数组|对象的长度
  showLength?: boolean;
  // key名是否显示双引号
  showDoubleQuotes?: boolean;
  // 数据层级顶级路径
  path?: string;
  // 定义数据层级支持的选中方式, 默认无该功能
  selectableType?: '' | 'multiple' | 'single';
  // 展示左侧选择控件
  showSelectController?: boolean;
  // 展示对齐线
  showLine?: boolean;
  // 在点击树的时候选中节点
  selectOnClickNode?: boolean;
  // 存在选择功能时, 定义已选中的数据层级
  //    多选时为数组['root.a', 'root.b'], 单选时为字符串'root.a'
  value?: string | string[];
  // 定义某个数据层级是否支持选中操作
  pathSelectable?: Function;
  // highlight current node when mouseover
  highlightMouseoverNode?: boolean;
  // highlight current node when selected
  highlightSelectedNode?: boolean;
  // event: on values change
  onChange?: (val: string | string[]) => void,
  // event: click
  onClick?: (path: string, data: any) => void,
  /* outer props */

  /* inner props */
  // 当前树的父级数据
  parentData?: any;
  // 当前树的深度, 以根节点作为0开始, 所以第一层树的深度为1, 递归逐次递增
  currentDeep?: number;
  // 当前树的数据 data 为数组时 currentKey 表示索引, 为对象时表示键名
  currentKey?: number | string;
  /* outer props */
}

const App: React.FC<Props> = ({
  // outer props
  data,
  deep = Infinity,
  showLength = false,
  showDoubleQuotes = true,
  path = 'root',
  selectableType = '',
  showSelectController = false,
  showLine = true,
  selectOnClickNode = true,
  value = '',
  pathSelectable = () => true,
  highlightMouseoverNode = false,
  highlightSelectedNode = true,
  onChange = () => {},
  onClick = () => {},
  // inner props
  parentData,
  currentDeep = 1,
  currentKey,
}) => {
  const [visible, setVisible] = useState(currentDeep <= deep);
  const [isMouseover, setMouseover] = useState(false);
  const [currentCheckboxVal, setCurrentCheckboxVal] = useState(
    Array.isArray(value) ? value.includes(path) : false
  );

  const isObject = (value: any) => getDataType(value) === 'object';

  useEffect(() => {
    setVisible(currentDeep <= deep);
  }, [deep, currentDeep]);

  // const defaultVal = selectableType === 'multiple' ? [] : (selectableType === 'single' ? '' : null);

  // 获取当前 data 中最后一项的 key 或 索引, 便于界面判断是否添加 ","
  const lastKey = (() => {
    if (Array.isArray(parentData)) {
      return parentData.length - 1
    } else if (isObject(parentData)) {
      let arr = Object.keys(parentData)
      return arr[arr.length - 1]
    }
  })();

  // 多选模式
  const isMultiple = selectableType === 'multiple';
  // 单选模式
  const isSingle = selectableType === 'single';
  // 是否不是最后一项
  const notLastKey = currentKey !== lastKey;
  // 当前的树是否支持选中功能
  const selectable = pathSelectable(path, data) && (isMultiple || isSingle);

  const isSelected = (() => {
    if (isMultiple) {
      return value.includes(path);
    } else if (isSingle) {
      return value === path;
    } else {
      return false;
    }
  })();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(path, data);

    if (selectable && selectOnClickNode) {
      handleValueChange('tree');
    }
  };

  const handleValueChange = (emitType: 'tree' | 'checkbox' | 'radio') => {
    if (isMultiple
      && (emitType === 'checkbox' || emitType === 'tree')
      && Array.isArray(value)) {
      // handle multiple
      const index = value.findIndex(item => item === path);
      const newVal = [...value];
      if (index !== -1) {
        newVal.splice(index, 1);
      } else {
        newVal.push(path);
      }

      setCurrentCheckboxVal(!currentCheckboxVal);
      onChange(newVal);
    } else if (isSingle && (emitType === 'radio' || emitType === 'tree')) {
      // handle single
      if (value !== path) {
        const newVal = path;
        onChange(newVal);
      }
    }
  };

  const handleMouseover = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 可选择的树|普通展示树, 都支持mouseover
    highlightMouseoverNode && (selectable || selectableType === '') && setMouseover(true);
  };

  const handleMouseout = (e: React.MouseEvent) => {
    e.stopPropagation();
    highlightMouseoverNode && (selectable || selectableType === '') && setMouseover(false);
  };

  const keyFormatter = (key: string | number) => showDoubleQuotes ? `"${key}"` : key;

  const error = selectableType && !selectOnClickNode && !showSelectController;
  const errorMsg = error ? 'When selectableType is not null, selectOnClickNode and showSelectController cannot be false at the same time, because this will cause the selection to fail.' : '';
  if (errorMsg) {
    throw new Error(`[json-pretty] ${errorMsg}`);
  }

  return (
    <div
      className={[
        'vjs-tree',
        isMultiple || showSelectController ? 'has-selectable-control': '',
        currentDeep === 1 ? 'is-root': '',
        selectable ? 'is-selectable': '',
        isSelected ? 'is-selected': '',
        isSelected && highlightSelectedNode ? 'is-highlight-selected': '',
        isMouseover ? 'is-mouseover': ''
      ].join(' ')}
      onClick={handleClick}
      onMouseOver={handleMouseover}
      onMouseOut={handleMouseout}
    >
      {
        showSelectController && selectable ? [
          isMultiple ? (
            <Checkbox
              key={path}
              value={currentCheckboxVal}
              onChange={() => handleValueChange('checkbox')}
            />
          ) : null,
          isSingle && typeof value === 'string' ? (
            <Radio
              key={path}
              value={value}
              path={path}
              onChange={() => handleValueChange('radio')}
            />
          ) : null
        ] : null
      }

      {
        Array.isArray(data) || isObject(data) ? (
          <>
            <BracketsLeft
              visible={visible}
              data={data}
              showLength={showLength}
              showComma={notLastKey}
              onToggleBrackets={setVisible}
            >
              {
                currentDeep > 1 && !Array.isArray(parentData) && currentKey
                  ? <span className="vjs-key">{keyFormatter(currentKey)}:</span>
                  : null
              }
            </BracketsLeft>

            {
              visible && Object.keys(data).map((key: number | string) => {
                const item = data[key];
                // 数据内容, data 为对象时, key 表示键名, 为数组时表示索引
                return (
                  <div
                    key={key}
                    className={[
                      'vjs-tree__content',
                      showLine ? 'has-line' : ''
                    ].join(' ')}
                  >
                    <App
                      value={value}
                      parentData={data}
                      data={item}
                      deep={deep}
                      showLength={showLength}
                      showDoubleQuotes={showDoubleQuotes}
                      showLine={showLine}
                      highlightMouseoverNode={highlightMouseoverNode}
                      highlightSelectedNode={highlightSelectedNode}
                      path={`${path}${Array.isArray(data) ? `[${key}]` : `.${key}`}`}
                      pathSelectable={pathSelectable}
                      selectableType={selectableType}
                      showSelectController={showSelectController}
                      selectOnClickNode={selectOnClickNode}
                      currentKey={key}
                      currentDeep={currentDeep + 1}
                      onClick={onClick}
                      onChange={onChange}>
                    </App>
                  </div>
                )
              })
            }

            <BracketsRight
              visible={visible}
              data={data}
              showComma={notLastKey}
              onToggleBrackets={setVisible}
            />
          </>
        ) : (
          <SimpleText
            showDoubleQuotes={showDoubleQuotes}
            showComma={notLastKey}
            data={data}
          >
            {
              !Array.isArray(parentData) && currentKey
                ? <span className="vjs-key">{keyFormatter(currentKey)}:</span>
                : null
            }
          </SimpleText>
        )
      }
    </div>
  );
};

export default App;
