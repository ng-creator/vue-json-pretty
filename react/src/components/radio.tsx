import React from 'react';

const { useState } = React;

export interface Props {
  path: string;
  value: string;
  onChange: (value: string) => void;
}

const Radio: React.FC<Props> = ({
  path: currentPath,
  value,
  onChange,
}) => {
  const [focus, setFocus] = useState(false);

  return (
    // 避免向上冒泡触发 tree.vue 的 click 事件
    <label
      className={[
        'vjs-radio',
        focus ? 'is-focus': '',
        value === currentPath ? 'is-checked': '',
      ].join(' ')}
      onClick={(e) => e.stopPropagation()}
    >
      <span className="vjs-radio__inner"></span>
      <input
        className="vjs-radio__original"
        type="radio"
        checked={value === currentPath}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </label>
  );
};

export default Radio;
