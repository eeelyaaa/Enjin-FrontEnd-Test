import Home from '../src/views/Home.vue';
import { shallowMount } from '@vue/test-utils';



const factory = (values = {}) => {
  return shallowMount(Home, {
    data () {
      return {
        ...values
      }
    }
  })
}

describe('Home', () => {
  it('has values', () => {
    const wrapper = factory({ currentSortDir: ''  })

    expect(wrapper).toBeTruthy()
  })

})