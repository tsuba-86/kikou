/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, Mail, AlertCircle, MessageSquare, BarChart3, CheckCircle, Handshake, Brush, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Analytics } from '@vercel/analytics/react';

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScWCMDxMJgcja8wlKa9u2X_pGidkoC9tOb0iOu9fJY14m14jw/viewform?usp=sharing&ouid=105401518336407820619";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  const menuItems = [
    { name: "キコウ！とは？", id: "about" },
    { name: "サービス内容", id: "services" },
    { name: "ご利用の流れ", id: "process" },
    { name: "料金プラン", id: "pricing" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const Modal = ({ title, content, isOpen, onClose }: { title: string, content: React.ReactNode, isOpen: boolean, onClose: () => void }) => (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[80vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-section-divider flex justify-between items-center bg-white sticky top-0">
              <h3 className="text-xl font-bold text-slate-900">{title}</h3>
              <button onClick={onClose} className="p-2 hover:bg-section-divider rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>
            <div className="p-8 overflow-y-auto text-text-main leading-relaxed whitespace-pre-wrap">
              {content}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  const privacyContent = (
    <div className="space-y-6">
      <p>キコウ！（以下「当サービス」）では、お問い合わせおよびサービス提供にあたり取得する個人情報を、以下の方針に基づき適切に取り扱います。</p>
      
      <div>
        <h4 className="font-bold text-slate-900 mb-2">1. 取得する情報</h4>
        <p>当サービスでは、以下の情報を取得する場合があります。</p>
        <ul className="list-disc pl-5 mt-2">
          <li>事業者名</li>
          <li>担当者名</li>
          <li>メールアドレス</li>
          <li>電話番号</li>
          <li>商品情報</li>
          <li>お問い合わせ内容</li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-slate-900 mb-2">2. 利用目的</h4>
        <p>取得した情報は、以下の目的で利用します。</p>
        <ul className="list-disc pl-5 mt-2">
          <li>お問い合わせへの回答</li>
          <li>サービス提供に関する連絡</li>
          <li>商品テスト実施に関する調整</li>
          <li>今後のサービス改善</li>
        </ul>
        <p className="mt-2">取得した情報を、上記目的以外で利用することはありません。</p>
      </div>

      <div>
        <h4 className="font-bold text-slate-900 mb-2">3. 第三者提供について</h4>
        <p>取得した個人情報を、法令に基づく場合を除き、本人の同意なく第三者へ提供することはありません。</p>
      </div>

      <div>
        <h4 className="font-bold text-slate-900 mb-2">4. 情報管理</h4>
        <p>取得した情報は適切に管理し、不正アクセス・漏洩・改ざん等の防止に努めます。</p>
      </div>

      <div>
        <h4 className="font-bold text-slate-900 mb-2">5. 開示・訂正・削除</h4>
        <p>ご本人からの要請があった場合、合理的な範囲で速やかに対応します。</p>
      </div>

      <div>
        <h4 className="font-bold text-slate-900 mb-2">6. お問い合わせ</h4>
        <p>本ポリシーに関するお問い合わせは、LP内の問い合わせフォームよりご連絡ください。</p>
      </div>
    </div>
  );

  const termsContent = (
    <div className="space-y-6">
      <p>本規約は、キコウ！（以下「当サービス」）の利用条件を定めるものです。</p>

      <div>
        <h4 className="font-bold text-slate-900 mb-2">第1条（サービス内容）</h4>
        <p>当サービスは、商品に関する意見収集および整理・改善提案を行う単発型の商品テストサービスです。</p>
      </div>

      <div>
        <h4 className="font-bold text-slate-900 mb-2">第2条（料金）</h4>
        <p>1商品あたり25,000円（税別）とします。サンプル代および発送費は事業者負担とします。</p>
      </div>

      <div>
        <h4 className="font-bold text-slate-900 mb-2">第3条（テスト方法）</h4>
        <p>利用者は以下のいずれかを選択できます。</p>
        <ul className="list-disc pl-5 mt-2">
          <li>売り場2店舗へのヒアリング</li>
          <li>一般消費者5名へのアンケート</li>
        </ul>
        <p className="mt-2 text-sm italic">※ 実施方法は商品特性により調整する場合があります。</p>
      </div>

      <div>
        <h4 className="font-bold text-slate-900 mb-2">第4条（成果について）</h4>
        <p>当サービスは、商品の売上や販売成果を保証するものではありません。</p>
      </div>

      <div>
        <h4 className="font-bold text-slate-900 mb-2">第5条（キャンセル）</h4>
        <p>テスト実施前のキャンセルは可能です。実施後の返金は原則対応できません。</p>
      </div>

      <div>
        <h4 className="font-bold text-slate-900 mb-2">第6条（知的財産）</h4>
        <p>本サービスを通じて整理された資料・提案内容は、利用者に帰属します。ただし、当サービスは事例として匿名で紹介する場合があります。</p>
      </div>

      <div>
        <h4 className="font-bold text-slate-900 mb-2">第7条（免責）</h4>
        <p>不可抗力による遅延や損害について、当サービスは責任を負いません。</p>
      </div>

      <div>
        <h4 className="font-bold text-slate-900 mb-2">第8条（規約変更）</h4>
        <p>本規約は、必要に応じて変更する場合があります。</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background-light text-text-main selection:bg-primary/20">
      {/* Modals */}
      <Modal 
        title="プライバシーポリシー" 
        content={privacyContent} 
        isOpen={activeModal === 'privacy'} 
        onClose={() => setActiveModal(null)} 
      />
      <Modal 
        title="利用規約" 
        content={termsContent} 
        isOpen={activeModal === 'terms'} 
        onClose={() => setActiveModal(null)} 
      />
      {/* Side Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-[70] shadow-2xl p-8"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-primary text-2xl font-black font-display">キコウ！</h2>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-primary/5 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-primary" />
                </button>
              </div>
              <nav className="space-y-6">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left text-xl font-bold text-slate-800 hover:text-primary transition-colors py-2"
                  >
                    {item.name}
                  </button>
                ))}
                <div className="pt-8 border-t border-section-divider">
                  <a
                    href={FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-primary text-white text-center py-4 rounded-full font-bold shadow-lg hover:bg-primary/90 transition-all"
                  >
                    お問い合わせ
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center bg-background-light/95 backdrop-blur-sm p-4 border-b border-section-divider justify-between">
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="text-primary flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-primary/5 rounded-full transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-primary text-2xl font-black leading-tight tracking-wider font-display">キコウ！</h1>
        <div className="flex items-center justify-end">
          <a 
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary text-xs font-bold leading-normal tracking-tight border border-primary rounded-full px-4 py-1.5 hover:bg-primary hover:text-white transition-all cursor-pointer inline-block"
          >
            お問い合わせ
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative">
        <div 
          className="flex min-h-[520px] flex-col gap-8 bg-cover bg-center bg-no-repeat items-center justify-center p-6 text-center" 
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBLt0zi8z0LM0lLS7Vd7hwFDkRipDKZBxmnvgmDYbtSix5ZoCvNOCtQlHYwnll_d_mmnW28jvr9-aCftFF1hx6zULS04U3034dXq2Le0at50aJ0_AGnGZovwFeWb4X4RQ1LgTTPqabSPwtHUJ5vvEcfsPsdM4Ze3TAogA92IiUwK_tj6u-Ob_DWOgwEaBaNx87QMTlGxbEhQX6J_lwdYrXEA3yPFm2b_7GSGX5n81cILRFUik8adeiCIPCxJb1w7-V_CsGL8Y6qP_cW")`
          }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tight drop-shadow-md">
              声を重ねて、<br/>商品は育つ。
            </h2>
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg max-w-sm mx-auto">
              <p className="text-primary text-sm font-bold mb-2">テストマーケティングの「はじめの一歩」を</p>
              <p className="text-slate-900 text-2xl font-bold">1商品 25,000円<span className="text-sm font-normal ml-1">（税別）から</span></p>
            </div>
          </motion.div>
          <motion.a 
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full max-w-[320px] cursor-pointer flex items-center justify-center overflow-hidden rounded-full h-16 px-8 bg-primary text-white text-lg font-bold shadow-xl transition-all hover:shadow-2xl hover:bg-primary/90"
          >
            まずは相談する（無料）
          </motion.a>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 px-6 bg-background-light max-w-4xl mx-auto">
        <h2 className="text-slate-900 text-3xl font-bold leading-tight text-center mb-12">こんなお悩みはありませんか？</h2>
        <div className="space-y-4">
          {[
            "作った商品が本当に売れるか不安",
            "小売店の生の声を聞く機会がない",
            "商品の強みをどう伝えればいいか分からない"
          ].map((text, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 p-5 rounded-2xl bg-section-divider border border-transparent hover:border-primary/20 transition-all"
            >
              <div className="bg-primary/10 p-1 rounded-full">
                <AlertCircle className="w-5 h-5 text-primary" />
              </div>
              <p className="text-text-main text-lg font-medium">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 bg-primary text-white text-center overflow-hidden">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 leading-relaxed">商品は、作って終わりではありません。</h2>
            <div className="w-20 h-1.5 bg-accent mx-auto mb-8 rounded-full"></div>
            <p className="text-lg leading-loose opacity-90">
              大切なのは、市場に出した後の「声」を拾い上げ、次の一手に繋げること。私たちは、作り手と使い手の間にある「情報のギャップ」を埋めるパートナーです。
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-background-light max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-3">About Us</p>
          <h2 className="text-slate-900 text-4xl font-bold">キコウ！とは？</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-video rounded-3xl overflow-hidden bg-section-divider relative shadow-2xl group">
            <img 
              alt="Consultation session" 
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxSWOF_gmfaiJIg1qELEAVlhF7qFjKHRQ7_iaYih_au-0wtuwnp_EpM7wttewBqOFlSZc-fjQG5yzBD7dDNG3_rRypzd5FNhBc5cqbGuRuq7jlRVusrTLB1qv2vWvb6Y4sAODBOJ6umq-Esv4BzCWK6UMmYV7XwhoWzOklUCPHjBSOTFBpVlOvLYcfk8NrNv8P5Y-e92lEr5YxddViYjdeWaQgMZdtdHCFHYkPMRN9nZYX1vtg0tiuXbTk-wkHtf8fh2yefck63xOE"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
            <div className="relative z-10 bg-white/90 backdrop-blur-md p-8 m-6 rounded-2xl text-center shadow-xl">
              <p className="text-primary text-xl font-bold leading-relaxed">「聞こう！」から始まる、<br/>改善のヒント。</p>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-text-main text-lg leading-loose">
              全国で商品開発経験があり、現在は地域商社業務も行っている経験を活かし、商品の強みを整理。
            </p>
            <p className="text-text-main text-lg leading-loose">
              繋がりがある、小売店や消費者のフィードバックを分析し、改善案を提案するテストマーケティング兼初期販路代行のサービスです。
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 px-6 bg-section-divider">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-background-light p-10 rounded-3xl shadow-sm border border-slate-100"
          >
            <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center text-primary mb-8">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-slate-900 text-2xl font-bold mb-4">1. 声を集める</h3>
            <p className="text-lg text-text-main leading-relaxed">独自のネットワークを活用し、ターゲット層や専門家からの忌憚のない意見を収集します。</p>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-background-light p-10 rounded-3xl shadow-sm border border-slate-100"
          >
            <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center text-primary mb-8">
              <BarChart3 className="w-8 h-8" />
            </div>
            <h3 className="text-slate-900 text-2xl font-bold mb-4">2. 声を整理する</h3>
            <p className="text-lg text-text-main leading-relaxed">膨大なフィードバックの中から、真に改善が必要なポイントと伸ばすべき魅力を抽出します。</p>
          </motion.div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-6 bg-background-light max-w-4xl mx-auto">
        <h2 className="text-slate-900 text-3xl font-bold text-center mb-16">活用シーン</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="border-l-4 border-accent pl-8 py-4 bg-accent/5 rounded-r-2xl">
            <h4 className="text-slate-900 text-xl font-bold mb-4">試作品の反応確認に</h4>
            <p className="text-text-main leading-relaxed">量産前に市場のニーズと乖離がないか確認し、リスクを最小限に抑えたい時。</p>
          </div>
          <div className="border-l-4 border-accent pl-8 py-4 bg-accent/5 rounded-r-2xl">
            <h4 className="text-slate-900 text-xl font-bold mb-4">既存商品のブラッシュアップ</h4>
            <p className="text-text-main leading-relaxed">売れ行きが伸び悩んでいる商品の、本当の「弱点」を見つけ出したい時。</p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 px-6 bg-section-divider">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-slate-900 text-3xl font-bold text-center mb-16">ご利用の流れ</h2>
          <div className="relative space-y-16 before:content-[''] before:absolute before:left-[23px] before:top-4 before:bottom-4 before:w-0.5 before:bg-primary/20">
            {[
              { title: "無料カウンセリング", desc: "商品の現状やお悩み、目指したい姿をオンラインでじっくり伺います。" },
              { title: "ヒアリングシート作成", desc: "商品の特徴を整理し、何を聞くべきか最適な質問を設計します。テストマーケティング対象を小売店(2店舗)or消費者(5名程度)からお選びください。" },
              { title: "テストマーケティング実施", desc: "パートナー店舗やネットワークを通じて、実際の声を集めます。" },
              { title: "分析・レポート報告", desc: "集まった声を多角的に分析し、具体的な改善提案書を作成します。" },
              { title: "次の一手の決定", desc: "レポートを元に、今後の商品展開や販促の方針を話し合います。" }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative flex gap-8"
              >
                <div className="z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xl font-bold shadow-lg">
                  {i + 1}
                </div>
                <div className="pt-2">
                  <h4 className="text-slate-900 text-xl font-bold mb-3">{step.title}</h4>
                  <p className="text-text-main text-lg leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6 bg-background-light max-w-4xl mx-auto">
        <h2 className="text-slate-900 text-3xl font-bold text-center mb-16">得られるメリット</h2>
        <div className="grid gap-6">
          {[
            "やるべきことの優先順位が明確になる",
            "客観的なデータで自信を持って営業できる",
            "無駄な投資（量産ミス）を防ぐことができる"
          ].map((benefit, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-5 p-6 rounded-2xl bg-primary/5 border border-primary/10"
            >
              <CheckCircle className="w-8 h-8 text-primary shrink-0" />
              <span className="text-xl font-bold text-slate-800">{benefit}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-primary/5">
        <div className="max-w-md mx-auto">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-background-light rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-primary/10"
          >
            <div className="bg-primary py-8 text-center">
              <h3 className="text-white text-2xl font-bold">シンプルプラン</h3>
            </div>
            <div className="p-10 text-center">
              <p className="text-lg mb-4 text-text-main font-medium">1商品・単発テスト</p>
              <div className="flex items-baseline justify-center gap-1 mb-8">
                <span className="text-slate-900 text-6xl font-black">25,000</span>
                <span className="text-slate-900 text-2xl font-bold">円〜</span>
              </div>
              <p className="text-sm text-text-main leading-relaxed mb-10 opacity-70">
                ※税別・サンプル提供代別途<br/>地域や内容により変動あり
              </p>
              <div className="border-t border-section-divider pt-10 space-y-5 text-left max-w-[240px] mx-auto">
                <p className="text-lg font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  フォームに基づいたヒアリング
                </p>
                <p className="text-lg font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  小売店or消費者へのサンプル提供
                </p>
                <p className="text-lg font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  フィードバックレポート
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Optional Plans */}
      <section className="py-24 px-6 bg-white max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-3">Optional Plans</p>
          <h2 className="text-slate-900 text-3xl font-bold">さらに深く、磨き上げるために。</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-10 rounded-3xl bg-section-divider border border-slate-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Handshake className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-slate-900 font-bold text-2xl leading-tight">商品開発伴走支援</h3>
            </div>
            <p className="text-primary font-bold text-xl mb-6">月額 ¥50,000〜</p>
            <p className="text-lg text-text-main leading-relaxed">
              本サービスで得たインサイトをさらに深掘り。商品が完成形として磨き上げられるまで、開発の全工程を継続的にサポートします。
            </p>
          </div>
          <div className="p-10 rounded-3xl bg-section-divider border border-slate-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Brush className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-slate-900 font-bold text-2xl leading-tight">デザインブラッシュアップ</h3>
            </div>
            <p className="text-primary font-bold text-xl mb-6">一式 ¥100,000〜</p>
            <p className="text-lg text-text-main leading-relaxed">
              関東・関西の第一線で活躍するプロのデザイナーをアサイン。ターゲットや利用シーンに基づき、商品の魅力を最大化するデザインへと磨き上げます。
            </p>
          </div>
        </div>
      </section>

      {/* Profile */}
      <section className="py-24 px-6 bg-background-light border-y border-section-divider">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-8 bg-section-divider shadow-xl ring-4 ring-primary/5">
            <img 
              alt="Founder" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwgzgAIhKyTe6_qgq4SE-RwV9B4ndD-xg8O7SOTrL8PW2ySK6hwimo9MFFXOAAMB6X7yRr6ueG8LhF7KE2s0XbbJq18xrIV3h1xwCtWsw7WkW8X2hMno9dyXY7TVxF4CzZQkF9rcJ3K7aMdxGsB9oVFS7nvXEJEYbfcvjp-ZCxzgcuuci2qkiO5LX7oVN-E3bhqyIWtxYL3Hh72tyKfXrTL9Osahlu-zpJCwBFL34cm0nuDlu-ojxKpHoZ9g21IZnxOXyrU7mRbCVv"
              referrerPolicy="no-referrer"
            />
          </div>
          <h3 className="text-slate-900 text-2xl font-bold mb-6">代表 長崎県を中心に活躍する商品開発プロデューサー</h3>
          <p className="text-lg leading-loose text-text-main px-4">
            九州を中心に商品開発や商社事業を行う中で感じた課題をもとにサービスを立ち上げました。まずはお気軽に相談ください。
          </p>
        </div>
      </section>

      {/* Catchphrase */}
      <section className="py-24 px-6 bg-accent/20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-slate-900 text-3xl font-bold leading-relaxed mb-6">
            商品を作るだけでなく、<br/>商品を育てる仕組みを。
          </h2>
          <p className="text-lg text-text-main font-medium opacity-80">We help your products grow with authentic voices.</p>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-background-light text-center">
        <h2 className="text-slate-900 text-4xl font-bold mb-12">まずは一度、<br/>声を聞いてみませんか？</h2>
        <motion.a 
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full max-w-[360px] cursor-pointer flex items-center justify-center mx-auto overflow-hidden rounded-full h-20 px-10 bg-primary text-white text-xl font-bold shadow-2xl transition-all hover:bg-primary/90"
        >
          まずは相談する（無料）
        </motion.a>
        <p className="mt-8 text-lg text-primary font-bold flex items-center justify-center gap-2">
          <Mail className="w-5 h-5" />
          お問い合わせは24時間受付中
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-section-divider py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-primary text-3xl font-black mb-10 font-display">キコウ！</h1>
          <div className="mb-12 text-text-main text-lg space-y-3">
            <p className="font-bold text-slate-900 text-xl">合同会社YOKARAI (YOKARAI LLC)</p>
            <p>長崎県松浦市星鹿町岳崎免2524-2</p>
            <p className="mt-4 flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              <a className="hover:text-primary transition-colors font-medium border-b border-transparent hover:border-primary" href="mailto:info@hoshikagyoko.com">
                info@hoshikagyoko.com
              </a>
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mb-12 text-text-main text-sm font-bold">
            <a className="hover:text-primary transition-colors" href="#">運営会社</a>
            <button 
              onClick={() => setActiveModal('privacy')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              プライバシーポリシー
            </button>
            <button 
              onClick={() => setActiveModal('terms')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              利用規約
            </button>
          </div>
          <p className="text-xs text-text-main opacity-50 font-medium tracking-widest">
            © 2024 キコウ！ All Rights Reserved.
          </p>
        </div>
      </footer>
      <Analytics />
    </div>
  );
}
