interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: '내 마음 속 바다',
    description: `주변에 부담을 줄까 봐 털어놓지 못한 이야기를 물병에 담아서 바다로 흘려보내는 서비스`,
    imgSrc: '/static/images/oceanletter.png',
    href: 'https://github.com/dnd-side-project/dnd-10th-4-frontend',
  },
  {
    title: '모아밤',
    description: `귀여운 새를 키우는 성취감과 친구와 함께한다는 의무감을 부여하여 계획을 꾸준히 실천하는 것을 돕는 서비스`,
    imgSrc: '/static/images/moabam.png',
    href: 'https://github.com/team-moabam/moabam-FE',
  },
]

export default projectsData
