import { Link } from 'react-router-dom'
import { Mic, PenTool, BookOpen, TrendingUp, Clock, Target } from 'lucide-react'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>AI와 함께하는 영어 학습</h1>
        <p>말하기, 쓰기, 읽기를 종합적으로 연습하며 영어 실력을 한 단계 끌어올리세요</p>
      </div>

      <div className="features">
        <Link to="/speaking" className="feature-card">
          <div className="icon-container speaking">
            <Mic size={40} />
          </div>
          <h2>말하기 연습</h2>
          <p>매일 새로운 질문에 대해 3분 안에 답변을 녹음하고, AI 튜터가 발음과 문법을 교정해드립니다.</p>
          <div className="feature-tags">
            <span className="tag"><Clock size={14} /> 3분 제한</span>
            <span className="tag"><Target size={14} /> AI 피드백</span>
          </div>
        </Link>

        <Link to="/writing" className="feature-card">
          <div className="icon-container writing">
            <PenTool size={40} />
          </div>
          <h2>쓰기 연습</h2>
          <p>짧은 주제에 대해 10분 안에 에세이를 작성하고, AI가 맞춤형 피드백을 제공합니다.</p>
          <div className="feature-tags">
            <span className="tag"><Clock size={14} /> 10분 제한</span>
            <span className="tag"><Target size={14} /> AI 교정</span>
          </div>
        </Link>

        <Link to="/reading" className="feature-card">
          <div className="icon-container reading">
            <BookOpen size={40} />
          </div>
          <h2>읽기 연습</h2>
          <p>토익, 토플, 수능 등 다양한 시험 지문을 연습하고, 각 문제의 해결 방법을 학습합니다.</p>
          <div className="feature-tags">
            <span className="tag"><Clock size={14} /> 2분/문제</span>
            <span className="tag"><Target size={14} /> 해설 제공</span>
          </div>
        </Link>
      </div>

      <div className="stats">
        <div className="stat-card">
          <TrendingUp size={32} />
          <div>
            <h3>학문적 접근</h3>
            <p>체계적인 커리큘럼</p>
          </div>
        </div>
        <div className="stat-card">
          <Clock size={32} />
          <div>
            <h3>시간 제한</h3>
            <p>실전 상황 연습</p>
          </div>
        </div>
        <div className="stat-card">
          <Target size={32} />
          <div>
            <h3>맞춤형 피드백</h3>
            <p>AI 튜터 개별 지도</p>
          </div>
        </div>
      </div>
    </div>
  )
}
