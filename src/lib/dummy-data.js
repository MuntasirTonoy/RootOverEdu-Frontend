export const courses = [
  {
    id: 'math-1st',
    title: 'Math 1st Year',
    shortDescription: 'Foundational Mathematics Program',
    price: 1000,
    offerPrice: 550,
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600',
    tags: ['Algebra', 'Functions', 'Trigonometry'],
    features: [
      'Abstract Algebra & Number Theory',
      'Linear Programming & Optimization',
      'Analytic Geometry'
    ],
    subjects: [
      {
        id: 'calc1',
        title: 'Calculus 1',
        description: 'Differential & Integral foundations',
        price: 500,
        originalPrice: 1000,
        icon: 'pi', // Placeholder icon name
        chapters: [
          {
            id: 'ch-sets',
            title: 'Chapter 1: Sets & Logic',
            parts: [
              { id: 'p1', title: 'Part 1: Introduction to Sets', videoUrl: 'https://www.youtube.com/embed/KDPZy2lBhik?si=Hrblxlz8XxpY2Xa6' },
              { id: 'p2', title: 'Part 2: Logic Gates', videoUrl: 'https://www.youtube.com/embed/KDPZy2lBhik?si=Hrblxlz8XxpY2Xa6' },
            ]
          }
        ]
      },

      {
        id: 'calculus2',
        title: 'Calculus 2',
        description: 'Advanced integration & Series',
        price: 500,
        originalPrice: 1000,
        icon: 'calc',
        chapters: []
      },
      {
        id: 'linearalk',
        title: 'Linear Algebra',
        description: 'Matrices, Vectors & Eigenspaces',
        price: 500,
        originalPrice: 1000,
        icon: 'grid',
        chapters: []
      },
      {
        id: 'analytic',
        title: 'Analytic Geometry',
        description: 'Conics, Coordinates & 3D Geometry',
        price: 500,
        originalPrice: 1000,
        icon: 'grid',
        chapters: []
      }
    ]
  },
  {
    id: 'math-2nd',
    title: 'Math 2nd Year',
    shortDescription: 'Advanced Applied Mathematics',
    price: 1000,
    offerPrice: 550,
    coverImage: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&q=80&w=600',
    tags: ['Calculus', 'Vectors', 'Stats'],
    features: [
      'Calculus II (Multivariable)',
      'Ordinary Differential Equations',
      'Fortran Programming'
    ],
    subjects: [
      {
        id: 'calc3',
        title: 'Calculus 3',
        description: 'Multivariable Calculus',
        price: 600,
        originalPrice: 1200,
        icon: 'calc',
        chapters: []
      },
      {
        id: 'ode',
        title: 'Ordinary Differential Equations',
        description: 'First & Higher Order ODEs',
        price: 600,
        originalPrice: 1200,
        icon: 'pi',
        chapters: []
      },
      {
        id: 'fortran',
        title: 'Fortran Programming',
        description: 'Scientific Computing Basics',
        price: 600,
        originalPrice: 1200,
        icon: 'grid',
        chapters: []
      }
    ]
  },
  {
    id: 'math-3rd',
    title: 'Math 3rd Year',
    shortDescription: 'Specialized Theoretical Math',
    price: 1000,
    offerPrice: 550,
    coverImage: 'https://images.unsplash.com/photo-1509228627129-6692bb7013d6?auto=format&fit=crop&q=80&w=600',
    tags: ['Real Analysis', 'Mechanics'],
    features: [
      'Real Analysis',
      'Classical Mechanics',
      'Numerical Analysis'
    ],
    subjects: [
      {
        id: 'real-analysis',
        title: 'Real Analysis',
        description: 'Rigorous Calculus & Measure Theory',
        price: 700,
        originalPrice: 1400,
        icon: 'pi',
        chapters: []
      },
      {
        id: 'mechanics',
        title: 'Classical Mechanics',
        description: 'Newtonian, Lagrangian & Hamiltonian',
        price: 700,
        originalPrice: 1400,
        icon: 'calc',
        chapters: []
      },
      {
        id: 'numerical',
        title: 'Numerical Analysis',
        description: 'Algorithms for Continuous Math',
        price: 700,
        originalPrice: 1400,
        icon: 'grid',
        chapters: []
      }
    ]
  },
  {
    id: 'math-4th',
    title: 'Math 4th Year',
    shortDescription: 'Honours Completion Modules',
    price: 1000,
    offerPrice: 550,
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600',
    tags: ['Topology', 'Complex Analysis'],
    features: [
      'Topology & Functional Analysis',
      'Complex Analysis',
      'Partial Differential Equations'
    ],
    subjects: [
      {
        id: 'topology',
        title: 'Topology',
        description: 'Spaces, Continuity & Connectivity',
        price: 800,
        originalPrice: 1600,
        icon: 'pi',
        chapters: []
      },
      {
        id: 'complex',
        title: 'Complex Analysis',
        description: 'Functions of Complex Variables',
        price: 800,
        originalPrice: 1600,
        icon: 'calc',
        chapters: []
      },
      {
        id: 'pde',
        title: 'Partial Differential Equations',
        description: 'Heat, Wave & Laplace Equations',
        price: 800,
        originalPrice: 1600,
        icon: 'grid',
        chapters: []
      }
    ]
  }
];

export const videos = [
  {
    id: "v1",
    title: "Introduction to Limits",
    subject: "Calculus 1",
    department: "math",
    semester: "1st",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "v2",
    title: "Matrix Multiplication",
    subject: "Linear Algebra",
    department: "math",
    semester: "1st",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "v3",
    title: "Newton's Laws of Motion",
    subject: "Physics 1",
    department: "physics",
    semester: "1st",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "v4",
    title: "Integration Techniques",
    subject: "Calculus 2",
    department: "math",
    semester: "2nd",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "v5",
    title: "Vector Spaces",
    subject: "Linear Algebra",
    department: "math",
    semester: "2nd",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "v6",
    title: "Thermodynamics Laws",
    subject: "Physics 2",
    department: "physics",
    semester: "2nd",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "v7",
    title: "First Order Differential Equations",
    subject: "ODE",
    department: "math",
    semester: "3rd",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "v8",
    title: "Quantum Wavefunctions",
    subject: "Complex Analysis",
    department: "math",
    semester: "4th",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "v9",
    title: "Complex Numbers & Functions",
    subject: "Complex Analysis",
    department: "math",
    semester: "5th",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "v10",
    title: "Topology Basics",
    subject: "Complex Analysis",
    department: "math",
    semester: "6th",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];
