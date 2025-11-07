import { useState, useEffect, useRef } from 'react'
import { Send, Bot, User, Sparkles } from 'lucide-react'
import './AIFeedback.css'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface Level {
  level: string
  description: string
}

const userLevel: Level = {
  level: 'Intermediate',
  description: '중급 수준의 학습자입니다. 기본 문법을 이해하고 있으나 복잡한 문장 구조에 어려움을 느낄 수 있습니다.'
}

export default function AIFeedback() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: `안녕하세요! AI 영어 튜터입니다. 현재 당신의 레벨은 **${userLevel.level}**입니다. ${userLevel.description} 영어 학습에 관한 어떤 질문이든 물어보세요!`,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages([...messages, userMessage])
    setInput('')
    setIsLoading(true)

    // AI 응답 시뮬레이션 (실제로는 API 호출)
    setTimeout(() => {
      const aiResponse = generateAIResponse(input, userLevel.level)
      const assistantMessage: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const generateAIResponse = (userQuestion: string, level: string): string => {
    const question = userQuestion.toLowerCase()
    
    // 레벨에 맞는 응답 생성
    if (question.includes('현재완료') || question.includes('present perfect')) {
      return `**현재완료(Present Perfect)**에 대해 설명드리겠습니다!\n\n현재완료는 **have/has + 과거분사** 형태로, 다음 세 가지 의미를 가집니다:\n\n1. **과거부터 현재까지 계속된 동작**\n   - "I have studied English for 3 years." (3년 동안 영어를 공부했다)\n\n2. **과거의 경험**\n   - "I have been to Paris." (파리에 가본 적이 있다)\n\n3. **방금 완료된 동작**\n   - "I have just finished my homework." (방금 숙제를 끝냈다)\n\n**${level} 레벨**에서는 특히 시간 표현과 함께 사용하는 경우를 많이 연습하시면 좋습니다!`
    }
    
    if (question.includes('가정법') || question.includes('subjunctive')) {
      return `**가정법(Subjunctive Mood)**에 대해 설명드리겠습니다!\n\n가정법은 사실이 아닌 것을 가정하거나 소망을 표현할 때 사용합니다:\n\n**1. 가정법 과거 (현재/미래의 불가능한 상황)**\n   - "If I were you, I would study harder."\n   - 현재 사실과 반대되는 상황\n\n**2. 가정법 과거완료 (과거의 불가능한 상황)**\n   - "If I had studied harder, I would have passed."\n   - 과거 사실과 반대되는 상황\n\n**${level} 레벨**에서는 기본적인 가정법 과거부터 익히시는 것을 추천합니다!`
    }
    
    if (question.includes('관계대명사') || question.includes('relative pronoun')) {
      return `**관계대명사(Relative Pronoun)**에 대해 설명드리겠습니다!\n\n관계대명사는 앞에 나온 명사를 수식하는 역할을 합니다:\n\n- **who**: 사람 (주격)\n  - "The teacher who teaches English is kind."\n\n- **which**: 사물 (주격/목적격)\n  - "This is the book which I bought yesterday."\n\n- **that**: 사람/사물 (주격/목적격)\n  - "I like the song that you recommended."\n\n- **whom**: 사람 (목적격, 공식적인 문체)\n  - "The person whom I met was friendly."\n\n**${level} 레벨**에서는 which와 that의 차이를 먼저 이해하시면 좋습니다!`
    }
    
    if (question.includes('번역') || question.includes('translate')) {
      return `번역 연습을 도와드리겠습니다!\n\n**효과적인 번역 방법:**\n\n1. **문장 구조 파악**: 주어, 동사, 목적어를 먼저 찾아보세요.\n2. **의미 단위로 나누기**: 긴 문장은 의미 단위로 나눠서 번역합니다.\n3. **자연스러운 표현**: 직역보다는 자연스러운 한국어/영어로 번역합니다.\n\n**예시:**\n- "I have been working on this project for two months."\n- "나는 이 프로젝트를 2개월 동안 진행하고 있다."\n\n${level} 레벨에서는 복잡한 시제 표현에 주의하시면 좋습니다!`
    }
    
    if (question.includes('어휘') || question.includes('vocabulary')) {
      return `어휘 학습 방법을 알려드리겠습니다!\n\n**효과적인 어휘 학습:**\n\n1. **맥락에서 학습**: 단어만 외우지 말고 문장에서 사용해보세요.\n2. **반복 학습**: 하루에 조금씩이라도 매일 복습하세요.\n3. **활용 연습**: 새로 배운 단어로 문장을 만들어보세요.\n\n**${level} 레벨** 권장 어휘:\n- 중급 수준의 일상 표현\n- 학술적 글쓰기에 필요한 기본 어휘\n- 비즈니스 상황에서 사용하는 표현\n\n특히 **동의어와 반의어**를 함께 학습하시면 효과적입니다!`
    }
    
    // 기본 응답
    return `좋은 질문이네요! **${level} 레벨**에 맞춰 답변드리겠습니다.\n\n${userQuestion}에 대한 답변을 준비 중입니다. 더 구체적으로 질문해주시면 더 정확한 답변을 드릴 수 있습니다.\n\n다음과 같은 주제에 대해 질문할 수 있습니다:\n- 문법 설명\n- 어휘 사용법\n- 번역 방법\n- 학습 전략\n- 오답 정리\n\n어떤 것이 궁금하신가요?`
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="ai-feedback-page">
      <div className="feedback-header">
        <div className="header-content">
          <div className="header-icon">
            <Sparkles size={32} />
          </div>
          <div>
            <h1>AI 피드백</h1>
            <p>레벨 기반 맞춤형 학습 도우미</p>
            <div className="level-badge">
              현재 레벨: <strong>{userLevel.level}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="chat-container">
        <div className="messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
            >
              <div className="message-avatar">
                {message.role === 'user' ? (
                  <User size={20} />
                ) : (
                  <Bot size={20} />
                )}
              </div>
              <div className="message-content">
                <div
                  className="message-text"
                  dangerouslySetInnerHTML={{
                    __html: message.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />')
                  }}
                />
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message assistant-message">
              <div className="message-avatar">
                <Bot size={20} />
              </div>
              <div className="message-content">
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <textarea
            className="message-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="영어 학습에 관한 질문을 입력하세요..."
            rows={3}
            disabled={isLoading}
          />
          <button
            className="send-button"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
          >
            <Send size={20} />
            전송
          </button>
        </div>
      </div>

      <div className="suggestions">
        <h3>자주 묻는 질문</h3>
        <div className="suggestion-chips">
          <button
            className="chip"
            onClick={() => setInput('현재완료에 대해 설명해주세요')}
          >
            현재완료란?
          </button>
          <button
            className="chip"
            onClick={() => setInput('가정법 사용법을 알려주세요')}
          >
            가정법 사용법
          </button>
          <button
            className="chip"
            onClick={() => setInput('관계대명사 차이점')}
          >
            관계대명사 차이
          </button>
          <button
            className="chip"
            onClick={() => setInput('어휘 학습 방법')}
          >
            어휘 학습 팁
          </button>
        </div>
      </div>
    </div>
  )
}

