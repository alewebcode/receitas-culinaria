import { api } from '@/services/api'
import jsPDF from 'jspdf'
import { toast } from 'vue-sonner'

export function useRecipePrint() {
  async function handlePrint(id: number) {
    try {
      const { data } = await api.get(`/recipes/${id}/print`)

      const doc = new jsPDF()

      doc.setFontSize(20)
      doc.text(data.nome, 105, 20, { align: 'center' })

      doc.setFontSize(12)
      doc.text(`Tempo de preparo: ${data.tempo_preparo_minutos} min`, 20, 40)
      doc.text(`Porções: ${data.porcoes}`, 20, 50)

      doc.setFontSize(12)
      doc.text('Ingredientes:', 20, 60)
      doc.setFontSize(12)
      doc.text(data.ingredientes, 20, 70)

      doc.setFontSize(12)
      doc.text('Modo de preparo:', 20, 80)
      doc.setFontSize(12)
      doc.text(data.modo_preparo, 20, 90)

      const blob = doc.output('blob')
      const url = URL.createObjectURL(blob)
      window.open(url, '_blank')

      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch {
      toast.error('Erro ao gerar PDF')
    }
  }

  return { handlePrint }
}
