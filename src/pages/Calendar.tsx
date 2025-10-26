import { useState } from 'react'
import { Calendar as CalendarIcon, Flag, Target, Plus, Edit2, Trash2 } from 'lucide-react'
import './Calendar.css'

interface DiaryEntry {
  id: string
  date: string
  type: 'speaking' | 'writing' | 'reading'
  difficulty: string
  notes: string
}

const CALENDAR_2024 = {
  January: [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, 31]
  ],
  February: [
    [null, null, null, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29]
  ],
  March: [
    [null, null, null, null, null, 1, 2],
    [3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30],
    [31]
  ]
}

export default function Calendar() {
  const [entries, setEntries] = useState<DiaryEntry[]>([
    {
      id: '1',
      date: '2024-01-15',
      type: 'speaking',
      difficulty: '중',
      notes: '발음 교정이 필요합니다. 특히 r과 l 구분이 어렵습니다.'
    },
    {
      id: '2',
      date: '2024-01-16',
      type: 'reading',
      difficulty: '상',
      notes: '토익 지문 이해도 향상. 어휘 확장이 필요합니다.'
    }
  ])
  
  const [showModal, setShowModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null)
  
  const [formData, setFormData] = useState({
    type: 'speaking' as 'speaking' | 'writing' | 'reading',
    difficulty: '하',
    notes: ''
  })

  const currentDate = new Date()
  const [currentMonth, setCurrentMonth] = useState(currentDate.toLocaleString('en-US', { month: 'long' }))
  const currentYear = currentDate.getFullYear()

  const handleDateClick = (date: number | null, month: string) => {
    if (!date) return
    const fullDate = `${currentYear}-${String(currentMonthToNumber(month)).padStart(2, '0')}-${String(date).padStart(2, '0')}`
    setSelectedDate(fullDate)
    setShowModal(true)
    setFormData({ type: 'speaking', difficulty: '하', notes: '' })
    setSelectedEntry(null)
  }

  const handleSaveEntry = () => {
    if (selectedEntry) {
      setEntries(entries.map(e => 
        e.id === selectedEntry.id 
          ? { ...selectedEntry, ...formData }
          : e
      ))
    } else {
      const newEntry: DiaryEntry = {
        id: Date.now().toString(),
        date: selectedDate,
        ...formData
      }
      setEntries([...entries, newEntry])
    }
    setShowModal(false)
  }

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id))
  }

  const handleEditEntry = (entry: DiaryEntry) => {
    setSelectedEntry(entry)
    setFormData({
      type: entry.type,
      difficulty: entry.difficulty,
      notes: entry.notes
    })
    setShowModal(true)
  }

  const currentMonthToNumber = (month: string) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December']
    return months.indexOf(month) + 1
  }

  const getEntryForDate = (date: number, month: string) => {
    const fullDate = `${currentYear}-${String(currentMonthToNumber(month)).padStart(2, '0')}-${String(date).padStart(2, '0')}`
    return entries.find(e => e.date === fullDate)
  }

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'speaking': return '#6366f1'
      case 'writing': return '#f59e0b'
      case 'reading': return '#10b981'
      default: return '#6b7280'
    }
  }

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'speaking': return '말하기'
      case 'writing': return '쓰기'
      case 'reading': return '읽기'
      default: return type
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case '하': return '#10b981'
      case '중': return '#f59e0b'
      case '상': return '#ef4444'
      default: return '#6b7280'
    }
  }

  return (
    <div className="calendar-page">
      <div className="page-header">
        <h1>학습 기록</h1>
        <p>매일의 학습 경험을 기록하고 어려운 부분을 추적해보세요</p>
      </div>

      <div className="calendar-container">
        <div className="calendar-section">
          <div className="calendar-header">
            <h2>{currentYear}년 {currentMonth}</h2>
          </div>

          <div className="calendar-grid">
            <div className="weekdays">
              <div>일</div>
              <div>월</div>
              <div>화</div>
              <div>수</div>
              <div>목</div>
              <div>금</div>
              <div>토</div>
            </div>

            {CALENDAR_2024[currentMonth as keyof typeof CALENDAR_2024]?.map((week, weekIndex) => (
              <div key={weekIndex} className="week-row">
                {week.map((date, dateIndex) => {
                  const entry = date ? getEntryForDate(date, currentMonth) : null
                  return (
                    <div
                      key={dateIndex}
                      className={`calendar-day ${!date ? 'empty' : ''} ${entry ? 'has-entry' : ''}`}
                      onClick={() => handleDateClick(date, currentMonth)}
                    >
                      {date && (
                        <>
                          <span className="day-number">{date}</span>
                          {entry && (
                            <div 
                              className="entry-indicator"
                              style={{ backgroundColor: getTypeColor(entry.type) }}
                            />
                          )}
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="entries-section">
          <h2>기록 목록</h2>
          {entries.length === 0 ? (
            <div className="empty-state">
              <CalendarIcon size={48} />
              <p>아직 기록이 없습니다</p>
              <p className="hint">달력의 날짜를 클릭하여 학습 기록을 추가하세요</p>
            </div>
          ) : (
            <div className="entries-list">
              {entries.map(entry => (
                <div key={entry.id} className="entry-card">
                  <div className="entry-header">
                    <div className="entry-type" style={{ borderLeftColor: getTypeColor(entry.type) }}>
                      <span className="type-label">{getTypeLabel(entry.type)}</span>
                    </div>
                    <div className="entry-actions">
                      <button onClick={() => handleEditEntry(entry)} className="edit-btn">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDeleteEntry(entry.id)} className="delete-btn">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="entry-date">{entry.date}</div>
                  <div className="entry-difficulty">
                    <Flag size={14} />
                    <span style={{ color: getDifficultyColor(entry.difficulty) }}>
                      난이도: {entry.difficulty}
                    </span>
                  </div>
                  <p className="entry-notes">{entry.notes}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>학습 기록 {selectedEntry ? '수정' : '추가'}</h3>
            
            <div className="form-group">
              <label>날짜</label>
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </div>

            <div className="form-group">
              <label>영역</label>
              <div className="radio-group">
                <label>
                  <input 
                    type="radio" 
                    value="speaking" 
                    checked={formData.type === 'speaking'} 
                    onChange={(e) => setFormData({...formData, type: e.target.value as 'speaking'})}
                  />
                  <span className="radio-label speaking">말하기</span>
                </label>
                <label>
                  <input 
                    type="radio" 
                    value="writing" 
                    checked={formData.type === 'writing'} 
                    onChange={(e) => setFormData({...formData, type: e.target.value as 'writing'})}
                  />
                  <span className="radio-label writing">쓰기</span>
                </label>
                <label>
                  <input 
                    type="radio" 
                    value="reading" 
                    checked={formData.type === 'reading'} 
                    onChange={(e) => setFormData({...formData, type: e.target.value as 'reading'})}
                  />
                  <span className="radio-label reading">읽기</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>난이도</label>
              <select 
                value={formData.difficulty} 
                onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
              >
                <option value="하">하</option>
                <option value="중">중</option>
                <option value="상">상</option>
              </select>
            </div>

            <div className="form-group">
              <label>메모</label>
              <textarea 
                value={formData.notes} 
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="어려웠던 점이나 배운 내용을 기록하세요..."
                rows={5}
              />
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>
                취소
              </button>
              <button className="btn-save" onClick={handleSaveEntry}>
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
