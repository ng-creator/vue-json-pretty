<template>
  <div>
    <slot></slot>
    <span :class="`vjs-value vjs-value__${dataType}`">
      {{ textFormatter(data) }}
    </span>
  </div>
</template>

<script>
  import { getDataType } from 'src/utils'

  export default {
    props: {
      showDoubleQuotes: Boolean,
      data: {},
      showComma: Boolean
    },
    computed: {
      // 当前数据类型
      dataType () {
        return getDataType(this.data)
      }
    },
    methods: {
      textFormatter (data) {
        let text = data + ''
        if (this.dataType === 'string') text = `"${text}"`
        if (this.showComma) text += ','
        return text
      }
    }
  }
</script>
