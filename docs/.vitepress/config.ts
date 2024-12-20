import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Jaredan's Blog",
  description: "You are to be who you are, and not who you think you should be.",
  markdown: {
    math: true
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/avatar.jpg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Algorithms', link: '/articles/Algorithms/README' },
      { text: 'Essay Reading', link: '/articles/Essay_Reading/README' },
      { text: 'Machine Learning', link: '/articles/Notes/README' },
      { text: 'Project Hubs', link: '/articles/Project_Hubs/README' }
    ],
    sidebar: [
      {
        text: 'Algorithms',
        items: [
          { text: 'Dynamic Programming', link: '/articles/Algorithms/Dynamic_Programming' },
        ]
      },
      {
        text: 'Essay Reading',
        items: [
          { text: 'CNN Intro', link: 'articles/Essay_Reading/CNN'},
          { text: 'Transformer', link: '/articles/Essay_Reading/Transformer' },
          { text: 'SWin Transformer', link: '/articles/Essay_Reading/SWin_Transformer' },
          { text: 'DETR', link: '/articles/Essay_Reading/DeTR' },
          { text: 'BEVFormer', link: '/articles/Essay_Reading/BEVFormer' },
          { text: 'Diffusion', link: '/articles/Essay_Reading/Diffusion'}
        ]
      },
      {
        text: 'Machine Learning',
        items: [
          { text: 'CS329 ML Quizzes', link: '/articles/Notes/Quiz'},
          { text: 'Gaussian Distribution', link: '/articles/Notes/Gaussian_Distribution' },
          { text: 'Conditional Gaussion', link: '/articles/Notes/Conditonal_Gaussion_Distribution'}
        ]
      },
      {
        text: 'HPC Relevant',
        items:[
          { text: 'Slurm Installation', link: '/articles/HPC/Slurm'}
        ]
      },
      {
        text: 'Project Hubs',
        items: [
          { text: 'CS109 Jungle', link: '/articles/Project_Hubs/CS109' },
          { text: 'CS211 Electronic Organ', link: '/articles/Project_Hubs/CS211' },
          { text: 'CS213 Database API', link: '/articles/Project_Hubs/CS213' },
          { text: 'CS214 Pipeline CPU', link: '/articles/Project_Hubs/CS214' },
          { text: 'CS305 RDT Implementation', link: '/articles/Project_Hubs/CS305' },
          { text: 'CS311 AI projects', link: '/articles/Project_Hubs/CS311' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Jaredanwolfgang' },
      { 
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="120 13 72 72"><g fill="none" fill-rule="evenodd" transform=""><path d="m0 0h312v100h-312z"/><path d="m156 85c-19.882251 0-36-16.117749-36-36s16.117749-36 36-36 36 16.117749 36 36-16.117749 36-36 36zm18.222232-39.9993426-20.444332.0004656c-.981652 0-1.777511.7956502-1.777768 1.7773025l-.002109 4.4442415c-.000258.9818341.795468 1.7779763 1.777302 1.7782335h.00048l12.446471-.0005988c.981834-.0000082 1.777775.795919 1.777783 1.7777532v.0000148l-.000015.4443924v.4444466c0 2.9455024-2.387801 5.3333039-5.333304 5.3333039l-16.890119-.000049c-.981693 0-1.77752-.7958052-1.777547-1.7774984l-.000662-16.8884814c-.000081-2.9455025 2.387655-5.3333698 5.333157-5.333451h.000147l24.885554-.0009559c.981404 0 1.777159-.795262 1.777768-1.7766654l.004962-4.4442409c.000609-.981834-.794831-1.7782613-1.776665-1.7788703-.000368-.0000002-.000735-.0000003-.001103-.0000003l-24.888752.0011758c-7.363727 0-13.333219 5.9694589-13.333259 13.3331863l-.000221 24.8878699c-.000005.9818342.795924 1.7777724 1.777758 1.7777778l26.222571-.0000098c6.627235 0 11.999671-5.3724358 11.999671-11.9996713v-10.2219033c0-.9818341-.795934-1.777768-1.777768-1.777768z" fill="#c71d23"/></g></svg>'
        }, 
        link: 'https://gitee.com/jaredanwolfgang' }
    ],
    lastUpdated: {
      formatOptions: {
        dateStyle: 'short', 
        timeStyle: 'short'
      }
    }
  }
})
