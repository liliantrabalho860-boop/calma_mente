import { useState } from 'react';
import { ArrowLeft, Plus, Edit3, Trash2, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { JournalEntry } from '@/types/calmamente';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const JournalPage = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useLocalStorage<JournalEntry[]>('calmamente-journal', []);
  const [isWriting, setIsWriting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [content, setContent] = useState('');

  const handleSave = () => {
    const trimmed = content.trim();
    if (!trimmed) {
      toast.error('Escreva algo antes de salvar');
      return;
    }
    if (trimmed.length > 2000) {
      toast.error('Texto muito longo (máx. 2000 caracteres)');
      return;
    }

    if (editingId) {
      setEntries(entries.map((e) => e.id === editingId ? { ...e, content: trimmed } : e));
      toast.success('Entrada atualizada!');
    } else {
      const entry: JournalEntry = {
        id: crypto.randomUUID(),
        content: trimmed,
        timestamp: new Date().toISOString(),
      };
      setEntries([entry, ...entries]);
      toast.success('Entrada salva! ✍️');
    }

    setContent('');
    setIsWriting(false);
    setEditingId(null);
  };

  const handleEdit = (entry: JournalEntry) => {
    setContent(entry.content);
    setEditingId(entry.id);
    setIsWriting(true);
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
    toast.success('Entrada removida');
  };

  if (isWriting) {
    return (
      <div className="min-h-screen pb-24 px-5 pt-8 max-w-lg mx-auto flex flex-col">
        <button onClick={() => { setIsWriting(false); setEditingId(null); setContent(''); }} className="flex items-center gap-2 text-muted-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /><span className="text-sm">Voltar</span>
        </button>
        <h1 className="text-2xl font-display font-bold text-foreground mb-2">
          {editingId ? 'Editar Entrada' : 'Nova Entrada'}
        </h1>
        <p className="text-muted-foreground mb-6">Escreva livremente como você se sente</p>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Como você está se sentindo hoje? O que está passando pela sua mente?"
          className="flex-1 min-h-[200px] p-4 bg-card border border-border rounded-2xl text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 font-body"
          maxLength={2000}
          autoFocus
        />
        <p className="text-xs text-muted-foreground mt-2 text-right">{content.length}/2000</p>

        <button
          onClick={handleSave}
          className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-primary-foreground rounded-2xl font-semibold transition-all hover:shadow-glow"
        >
          <Save className="w-5 h-5" /> Salvar
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 px-5 pt-8 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Diário</h1>
          <p className="text-muted-foreground text-sm">Seus registros emocionais</p>
        </div>
        <button
          onClick={() => setIsWriting(true)}
          className="w-11 h-11 bg-primary text-primary-foreground rounded-xl flex items-center justify-center transition-all hover:shadow-glow hover:scale-105"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="text-center mt-16 animate-fade-in-up">
          <div className="text-5xl mb-4">📝</div>
          <p className="text-foreground font-semibold">Nenhuma entrada ainda</p>
          <p className="text-sm text-muted-foreground mt-1">Comece a escrever como se sente</p>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((entry) => (
            <div key={entry.id} className="glass-card rounded-2xl p-4 animate-fade-in-up">
              <div className="flex items-start justify-between mb-2">
                <time className="text-xs text-muted-foreground">
                  {format(new Date(entry.timestamp), "d 'de' MMMM, HH:mm", { locale: ptBR })}
                </time>
                <div className="flex gap-1">
                  <button onClick={() => handleEdit(entry)} className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg transition-colors">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(entry.id)} className="p-1.5 text-muted-foreground hover:text-destructive rounded-lg transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-foreground/90 whitespace-pre-wrap line-clamp-4">{entry.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JournalPage;
