import dayjs from 'dayjs'
import 'dayjs/locale/id'
import updateLocale from 'dayjs/plugin/updateLocale'

dayjs.locale('id')
dayjs.extend(updateLocale)

dayjs.updateLocale('id', {
  weekdays: 'Ahad_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
  weekdaysShort: 'Ahd_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
  weekdaysMin: 'Ah_Sn_Sl_Rb_Km_Jm_Sb'.split('_')
})

export default dayjs
