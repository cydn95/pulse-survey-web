//
//     Vue components KeyLines v6.9.2-2264518215
//
//     Copyright © 2011-2022 Cambridge Intelligence Limited.
//     All rights reserved.
//

<script>
import KlComponent from './Keylines.vue';
export default {
  name: 'KlChart',
  extends: KlComponent,
  data: () => ({
    type: 'chart'
  }),
  methods: {
    onLoad(options) {
      return this.component.layout('organic', options);
    }
  }
};
</script>
