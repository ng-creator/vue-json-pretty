import React from 'react';

export interface Props {
  visible: boolean;
  showComma: boolean;
  data: object | any[];
  // 切换括号展开|关闭
  onToggleBrackets: (visible: boolean) => void;
}

const BracketsRight: React.FC<Props> = ({
  children,
  visible,
  showComma,
  data,
  onToggleBrackets,
}) => {
  // 括号优化函数, 若不是最后一项, 自动添加逗号
  const bracketsFormatter = (brackets: string) => {
    return showComma ? `${brackets},` : brackets
  };

  return (
    <div>
      {children}

      {
        visible ? (
          <span
            className="vjs-tree__brackets"
            onClick={() => onToggleBrackets(!visible)}>
            {bracketsFormatter(Array.isArray(data) ? ']' : '}')}
          </span>
        ) : null
      }
    </div>
  );
};

export default BracketsRight;
