import { useState, useEffect } from 'react'
import { PenTool, Clock, RotateCcw } from 'lucide-react'
import './Writing.css'

interface Feedback {
  grammar: string
  vocabulary: string
  structure: string
  overall: string
}

export default function Writing() {
  const [timeLeft, setTimeLeft] = useState(180) // 3 minutes
  const [text, setText] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [feedback, setFeedback] = useState<Feedback | null>(null)

  const todayTopic = "Some people believe that technology has made our lives more complicated. Do you agree or disagree? Explain your position with specific examples."

  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0)
    setWordCount(words.length)
  }, [text])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  const startWriting = () => {
    setIsActive(true)
    setText('')
    setTimeLeft(180)
    setFeedback(null)
  }

  const handleSubmit = () => {
    if (!text.trim()) {
      alert('텍스트를 입력해주세요.')
      return
    }

    // Simulate AI feedback
    setFeedback({
      grammar: "대부분의 문법이 정확합니다. 'complicated'를 사용한 부분이 자연스럽습니다. 제안: 'more complicated' 대신 'increasingly complex'를 사용하면 더 formal한 톤이 됩니다.",
      vocabulary: "적절한 어휘를 사용했습니다. 'believe', 'technology', 'specific examples' 등이 적절합니다. 동의어 활용을 더 늘리면 좋겠습니다.",
      structure: "명확한 논리 구조를 갖추고 있습니다. 서론-본론-결론 구조가 잘 드러납니다. 단, 본론에서 더 구체적인 예시를 추가하면 설득력이 높아집니다.",
      overall: "훌륭한 에세이입니다. 3분이라는 제한된 시간에 명확한 입장을 제시하고 논리적으로 설명했습니다. 예시를 더 풍부하게 하면 완벽한 에세이가 될 것입니다."
    })
  }

  const resetWriting = () => {
    setText('')
    setWordCount(0)
    setTimeLeft(180)
    setIsActive(false)
    setFeedback(null)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="writing-page">
      <div className="page-header">
        <h1>쓰기 연습</h1>
        <p>짧은 주제에 대해 에세이를 작성하고 AI 피드백을 받아보세요</p>
      </div>
      
      <div className="encouragement-banner">
        ✍️ 글을 쓰는 것은 생각을 정리하는 가장 좋은 방법입니다!
      </div>

      <div className="writing-container">
        <div className="topic-card">
          <div className="topic-header">
            <h2>오늘의 주제</h2>
            <span className="date">{new Date().toLocaleDateString('ko-KR')}</span>
          </div>
          <p className="topic-text">{todayTopic}</p>
        </div>

        <div className="timer-section">
          <div className="timer-container">
            <Clock size={24} />
            <span className="timer">{formatTime(timeLeft)}</span>
            {timeLeft < 30 && <span className="time-warning">시간이 부족합니다!</span>}
          </div>
          <div className="word-count">단어 수: {wordCount}</div>
        </div>

        <div className="writing-section">
          {!isActive ? (
            <div className="start-prompt">
              <button className="start-button" onClick={startWriting}>
                <PenTool size={24} />
                <span>작성 시작</span>
              </button>
              <p className="prompt-text">3분 안에 주제에 대한 에세이를 작성하세요</p>
            </div>
          ) : (
            <div className="writing-editor">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="writing-textarea"
                placeholder="여기에 에세이를 작성하세요..."
                disabled={timeLeft === 0}
              />
              <div className="editor-footer">
                <button className="btn-primary" onClick={handleSubmit} disabled={timeLeft === 0}>
                  피드백 받기
                </button>
                <button className="btn-secondary" onClick={resetWriting}>
                  <RotateCcw size={18} />
                  다시 작성
                </button>
              </div>
            </div>
          )}
        </div>

        {feedback && (
          <div className="feedback-section">
            <h3>AI 튜터 피드백</h3>
            <div className="feedback-card grammar">
              <h4>문법</h4>
              <p>{feedback.grammar}</p>
            </div>
            <div className="feedback-card vocabulary">
              <h4>어휘</h4>
              <p>{feedback.vocabulary}</p>
            </div>
            <div className="feedback-card structure">
              <h4>구조</h4>
              <p>{feedback.structure}</p>
            </div>
            <div className="feedback-card overall">
              <h4>종합 평가</h4>
              <p>{feedback.overall}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
