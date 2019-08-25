import React from 'react';

export interface Props {
  showLength: boolean;
  visible: boolean;
  showComma: boolean;
  data: object | any[];
  // 切换括号展开|关闭
  onToggleBrackets: (visible: boolean) => void;
}

const BracketsLeft: React.FC<Props> = ({
  children,
  showLength,
  visible,
  showComma,
  data,
  onToggleBrackets,
}) => {
  // 括号优化函数, 若不是最后一项, 自动添加逗号
  const bracketsFormatter = (brackets: string) => {
    return showComma ? `${brackets},` : brackets
  };

  // 关闭括号生成器
  const closedBracketsGenerator = (data: object | any[]) => {
    const brackets = Array.isArray(data) ? '[...]' : '{...}'
    return bracketsFormatter(brackets)
  };

  // 长度标记生成器
  const lengthGenerator = (data: object | any[]) => {
    // 若展示长度, 形如 [...] // 3 items
    const text = Array.isArray(data)
      ? `${data.length} items`
      : `${Object.keys(data).length} keys`
    return ` // ${text}`
  };

  return (
    <div>
      {children}

      {
        visible ? (
          // Expand
          <span
            className="vjs-tree__brackets"
            onClick={() => onToggleBrackets(!visible)}>
            {Array.isArray(data) ? '[' : '{' }
          </span>
        ) : (
          // Collapse
          <>
            <span
              className="vjs-tree__brackets"
              onClick={() => onToggleBrackets(!visible)}>
              {closedBracketsGenerator(data)}
            </span>

            {
              showLength ? (
                <span className="vjs-comment">
                  {lengthGenerator(data)}
                </span>
              ) : null
            }
          </>
        )
      }
    </div>
  );
};

export default BracketsLeft;
