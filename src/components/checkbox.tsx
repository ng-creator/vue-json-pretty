import React from 'react';

const { useState } = React;

export interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
}

const Checkbox: React.FC<Props> = ({
  value,
  onChange,
}) => {
  const [focus, setFocus] = useState(false);

  return (
    // 避免向上冒泡触发 tree.vue 的 click 事件
    <label
      className={[
        'vjs-checkbox',
        focus ? 'is-focus': '',
        value ? 'is-checked': '',
      ].join(' ')}
      onClick={(e) => e.stopPropagation()}
    >
      <span className="vjs-checkbox__inner"></span>
      <input
        className="vjs-checkbox__original"
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(!value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </label>
  );
};

export default Checkbox;
