import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { WDataTable, WTableFilter } from '~/core/components/Table/Wtable'
import { ETableSort } from '~/core/components/Table/Wtable'
import { MBase } from '~/core/models'
import type { MAuth } from '~/core/models'
import { UserListService } from '~/core/services/user'

export const useUserTableStore = defineStore('userTable', () => {
  const _table: Ref<WDataTable> = ref({
    properties: [
      {
        label: 'Name',
        data: 'name',
        sortable: false,
      },
      {
        label: 'email',
        data: 'email',
        sortable: false,
      },
      {
        label: 'Phone',
        data: 'phone',
        sortable: false,
      },
    ],
    items: [],
    filters: {
      keyword: '',
      page: 1,
      sort: ETableSort.asc,
      sortBy: '',
      totalData: 0,
      totalPerPage: 10,
    },
  })

  const service = new UserListService()
  const doGetUserList = async () => {
    const { data, error } = await service.create({
      filter: {
        set_name: false,
        name: '',
        set_phone: false,
        phone: '',
        set_email: false,
        email: '',
        set_role_id: false,
        role_id: 0,
        set_is_active: false,
        is_active: false,
      },
      limit: _table.value.filters.totalPerPage,
      page: _table.value.filters.page,
      order: 'created_at',
      sort: MBase.ESort.asc,
    })
    if (!error.value) {
      const response: MAuth.IResponse = data.value?.data
      _table.value.items = response as any
      _table.value.filters.totalData = data.value?.total_data as number
    }
  }

  const setFilters = (filter: WTableFilter) => {
    _table.value.filters = filter
    doGetUserList()
  }

  const table = computed(() => _table)
  return {
    table,
    doGetUserList,
    setFilters,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserTableStore, import.meta.hot))
