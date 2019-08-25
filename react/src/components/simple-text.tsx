import React from 'react';
import { getDataType } from '../utils';

export interface Props {
  showDoubleQuotes: boolean;
  data: any;
  showComma: boolean;
}

const SimpleText: React.FC<Props> = ({
  children,
  showDoubleQuotes,
  data,
  showComma,
}) => {
  // 当前数据类型
  const dataType = getDataType(data);

  const textFormatter  = (data: any)  => {
    let text = data.toString();
    if (dataType === 'string') text = `"${text}"`;
    if (showComma) text += ',';
    return text;
  };

  return (
    <div>
      {children}
      <span className={`vjs-value vjs-value__${dataType}`}>
        {textFormatter(data)}
      </span>
    </div>
  );
};

export default SimpleText;
