import React from "react";
import styles from './Readings.module.css';
import { Row, Col } from 'react-grid-system';
import ReadingImgSrc1 from '../../assets/readingsImg/1.png'
import ReadingImgSrc2 from '../../assets/readingsImg/2.png'
import ReadingImgSrc3 from '../../assets/readingsImg/3.png'
import ReadingImgSrc4 from '../../assets/readingsImg/4.png'
import ReadingImgSrc5 from '../../assets/readingsImg/5.png'
import ReadingImgSrc6 from '../../assets/readingsImg/6.png'

function Readings() {

  const readings = [{
    id: 1,
    imgSrc: ReadingImgSrc1,
    title: '二十一世紀數位公民基礎建設',
    link: 'https://drive.google.com/file/d/1B2szGfRQnKcoEXc7snpBblcjY4A8X90h/view?usp=share_link',
    description: '數發部多元宇宙科黃彥霖(豆泥)整理的二十一世紀數位公民基礎建設，將近期在做數位民主相關的組織以及各自的工作內容稍微編排整理。是份非常值得收藏的入門筆記分享。'
  }, {
    id: 2,
    imgSrc: ReadingImgSrc2,
    title: 'Radicle Civics',
    link: 'https://drive.google.com/file/d/1U9LXY3CTN2upEG38oz4j4vW8Vb0Yq21u/view',
    description: 'Radicle Civics is a research and development platform of DML that aims to explore alternative approaches for organising the future, focusing on pathways which encourage distributed agency and participation from a super-diverse public to challenge concentrations of power and responsibility.'
  }, {
    id: 3,
    imgSrc: ReadingImgSrc3,
    title: 'Colletive Intelligence Project (CIP) Whitepaper',
    link: 'https://drive.google.com/file/d/1ZyGr9scz9SKEJQyeBge8vURwynwXhzf-/view?usp=share_link',
    description: 'As an incubator for new governance model for transformative technology, CIP focuses on the research and development of collective intelligence capacities, which includes decision-making technologies processes and institutions that expand a group\'s capacity to construct and cooperate towards shared goals.'
  }, {
    id: 4,
    imgSrc: ReadingImgSrc4,
    title: 'HyperCerts Whitepaper',
    link: 'https://hypercerts.org/docs/whitepaper/ifs/',
    description: 'A new primitive for public goods funding through tracking and rewarding positive impact.'
  }, {
    id: 5,
    imgSrc: ReadingImgSrc5,
    title: 'AR Will Spark the Next Big Tech Platform—Call It Mirrorworld',
    link: 'https://www.wired.com/story/mirrorworld-ar-next-big-tech-platform/',
    description: 'Coined first by computer scientist David Gelernter from Yale University, the concept of mirror world depicts the ability to use computers to mirror realworld, allowing users to explore concepts in unprecedented detail. We are building a 1-to-1 map of almost unimaginable scope. When it\'s complete, our physical reality will merge with the digital universe.A new primitive for public goods funding through tracking and rewarding positive impact.'
  }, {
    id: 6,
    imgSrc: ReadingImgSrc6,
    title: 'Recursive Public: Piloting Connected Democratic Engagement with AI Governance',
    link: 'https://vtaiwan-openai-2023.vercel.app/Report_%20Recursive%20Public.pdf',
    description: 'This paper outlines a pilot run by Chatham House, vTaiwan and the AI Objectives Institute, one of ten teams funded under OpenAI’s Democratic Inputs to AI grant. It aims to test recursion: a series of information cascades between decision-makers, communities and deliberations over time that we deem essential to good AI governance.'
  }]
  return <div>
    <Row className={styles.readings}>
      {readings.map((rd) => {
        return (
          <Col xs={12} sm={12} xl={6} lg={12}>
            <a href={`${rd.link}`} target="_blank">
              <ReadingCard imgSrc={rd.imgSrc} title={rd.title} description={rd.description} />
            </a>
          </Col>
        )
      })}
    </Row>
  </div>
    ;
}


function ReadingCard({ imgSrc, title, description }) {
  return (

    <div className={styles.card}>
      <Row>
        <Col sm={2.5}>
          <img src={imgSrc} />
        </Col>
        <Col>
          <h3>{title}</h3>
          <p>{description}</p>
        </Col>
      </Row>
    </div>
  )
}

export default Readings;

