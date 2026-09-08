export const personalInfo = {
  name: "Gregorio Zaltzman",
  surname: "D'Ambrosio",
  initials: "GZ",
  title: "Aerospace Engineering",
  focus: "Aircraft design, aerodynamics, space systems, and spacecraft engineering.",
  degrees: [
    {
      degree: "M.S. Aerospace Engineering '28",
      institution: "Technical University of Munich",
      url: "https://www.asg.ed.tum.de/en/asg/home/",
    },
    {
      degree: "B.S. Aerospace Engineering '26",
      institution: "UC San Diego",
      url: "https://jacobsschool.ucsd.edu/",
    },
  ],
  resumeUrl: "/assets/resume.pdf",
  linkedinUrl: "https://www.linkedin.com/in/gregoriozaltzman/",
  githubUrl: "https://github.com/gregoriozaltzman",
  email: "gregoriozaltzman@gmail.com",
  location: "Munich, Germany",
  status: "OPEN TO WORK",
};

export const skillsData = [
  {
    category: "Software & CAD",
    skills: [
      "SolidWorks",
      "SolidWorks Flow Simulation",
      "Ansys Fluent",
      "OpenVSP",
      "AVL",
      "XFLR5",
      "XFOIL",
      "Fusion 360",
      "STK (Systems Tool Kit)",
      "Technical Drawings & CAD Assemblies",
    ],
  },
  {
    category: "Analysis & Simulation",
    skills: [
      "MATLAB",
      "Python",
      "Multidisciplinary Design Optimization (MDO)",
      "Aerodynamic Sizing & Trade Studies",
      "Constraint Analysis",
      "Drag Build-Up Methods",
      "VLM / Low-Fidelity Aero Tools",
      "Stability & Static Margin",
      "Controls Fundamentals (Signals & Systems)",
      "Thin-Walled Structures (Shear Flow)",
      "FEA Fundamentals",
    ],
  },
  {
    category: "Hardware & Lab",
    skills: [
      "Arduino IDE",
      "Sensor Instrumentation (lab-scale)",
      "Data Logging & Post-Processing",
      "Experimental Heat Transfer",
      "Rapid Prototyping",
      "RC Aircraft Integration Support",
      "Flight Test Support (student team)",
    ],
  },
  {
    category: "Languages",
    skills: ["English (Fluent)", "Spanish (Native)", "French (Fluent)"],
  },
];

export const timelineData = [
  {
    date: "Sep 2022",
    title: "UC San Diego — B.S. Aerospace",
    desc: "Commenced a Bachelor of Science in Aerospace Engineering, building a rigorous theoretical foundation. Coursework spanned Fluid Dynamics, Solid Mechanics, Thermodynamics, Aerospace Structures, Propulsion, Orbital Mechanics, Linear Control, and Experimental Techniques.",
  },
  {
    date: "Sep 2023",
    title: "ITS Service Desk Technician",
    desc: "Worked extensively to resolve campus-wide technical issues and improved support workflows. Collaborated with other ITS teams to help increase support efficiency and improve service quality.",
  },
  {
    date: "May 2025",
    title: "Promoted — Service Desk Lead",
    desc: "Helped lead a 60+ member technician team, overseeing daily campus-wide IT operations, complex troubleshooting, and cross-departmental coordination. Facilitated staff training and created technical documentation.",
  },
  {
    date: "Sep 2025",
    title: "Design-Build-Fly (DBF)",
    desc: "Collaborated on the Aerodynamics and Structures subteams for a competition-scale RC aircraft. Drove performance-based design trade studies by assisting with airfoil selection, structural sizing, and CAD modeling.",
  },
  {
    date: "Jan 2026",
    title: "Senior Design Capstone — BWB",
    desc: "Served as Chief Engineer for an ultra-efficient Blended Wing Body commercial airliner concept. Led cross-functional efforts spanning gradient-free aerodynamic optimization, unconventional structural layout, and aft-propulsion integration.",
  },
  {
    date: "2026",
    title: "Chief Engineer — Project Citadel",
    desc: "Served as Chief Engineer for a profit-maximizing RC aircraft project. Led a multidisciplinary team through rigorous gradient-based design optimization (MDO), aerodynamic analysis, and physical manufacturing.",
  },
  {
    date: "Present",
    title: "Technical University of Munich — M.S. Aerospace Engineering",
    desc: "Master of Science candidate in Aerospace Engineering (Class of 2028), specializing in advanced astronautics, spacecraft engineering, and space systems.",
  },
  {
    date: "Future Prospect",
    title: "EUSPA / ESA — Space Systems & Astronautics",
    desc: "Targeting European space initiatives with EUSPA (European Union Agency for the Space Programme) and ESA (European Space Agency), contributing to next-generation European satellite navigation, Earth observation, space transportation, and orbital infrastructure.",
  },
];

export const experienceData = [
  {
    id: "dbf",
    org: "Design Build Fly (DBF)",
    role: "Aerodynamics Team Subteam Member",
    image: "/assets/dbf.jpg",
    period: "Sep 2025 – 2026",
    desc: "Contributed to UCSD's Design-Build-Fly effort by supporting aerodynamic configuration decisions and practical build-to-test iteration on a student RC aircraft. Performed airfoil screening and low-fidelity analysis (XFOIL/XFLR5) to compare lift/drag trends under Reynolds-number constraints typical of competition-scale aircraft, and used results to inform geometry choices and stability targets. Helped translate analysis into CAD updates and manufacturing-ready geometry, then supported flight readiness through preflight checks and post-flight review.",
    highlights: [
      "Low-fidelity airfoil screening (XFOIL/XFLR5) at low Reynolds numbers",
      "CAD translation and geometry iteration for manufacturing tolerances",
      "Rigorous preflight checks and post-flight telemetry analysis",
    ],
  },
  {
    id: "its",
    org: "UCSD ITS",
    role: "Service Desk Lead (Promoted from Technician)",
    image: "/assets/its.jpg",
    period: "Sep 2023 – 2026",
    desc: "Progressed from Service Desk Technician to Lead, taking responsibility for shift operations, escalation triage, and technician support during high-impact incidents. Mentored newer technicians, improved consistency in ticket handling through clearer triage routines and documentation, and served as a primary escalation point for complex account, device, and software issues. Coordinated with higher-tier teams when incidents required deeper network or systems support, focusing on fast communication, accurate handoffs, and restoring service with minimal user downtime.",
    highlights: [
      "Co-managed operations and mentoring for a 60+ member technician team",
      "Point of escalation for major university-wide technical incidents",
      "Streamlined dispatch protocols and internal technical documentation",
    ],
  },
];

export const aspirationsData = {
  quote:
    "My long-term goal is to help propel humanity into the next era of space exploration by contributing to the development of advanced astronautical vehicles and space systems with organizations like EUSPA and ESA.",
  body: "I aspire to work at the forefront of spacecraft design, system integration, and orbital missions—with a direct future focus on European space programs including EUSPA (European Union Agency for the Space Programme) and ESA (European Space Agency). Developing technologies that strengthen human capabilities on Earth while expanding European and international presence beyond it.",
  destinations: [
    { label: "B.S. Aerospace", org: "UC San Diego", year: "2026" },
    { label: "M.S. Aerospace", org: "TUM Munich (Present)", year: "2028" },
    { label: "Future Goal", org: "EUSPA / ESA", year: "2028+" },
  ],
};

export const projectsData = [
  {
    id: "manta",
    title: "BWB Airliner Concept 'Manta'",
    category: "Conceptual Aircraft Design",
    tag: "01",
    size: "large",
    summary:
      "Conceptual design study for an ultra-efficient blended-wing-body (BWB) commercial transport named 'Manta', focused on configuration trades, propulsion-airframe integration, and performance-driven sizing. The design targets a 7,400 nmi long-haul route carrying 250 passengers at Mach 0.85, significantly improving upon traditional Tube and Wing (TAW) architectures.",
    image: "/assets/bwb.jpg",
    gallery: ["/assets/bwb.jpg"],
    model: "/assets/bwb.glb",
    skills: ["OpenVSP", "AVL", "Particle Swarm Optimization", "Monte Carlo", "Stability & Trim"],
    pdfs: [
      { title: "Executive Report", url: "/assets/bwb_report.pdf" },
    ],
    sections: [
      {
        heading: "Design Optimization & Analysis",
        items: [
          {
            title: "Gradient-Free Optimization",
            text: "Utilized Particle Swarm Optimization (PSO) via Python to maximize cruise L/D, improving the baseline from 24.85 to an optimized 25.30 while satisfying strict material yield stress and stability constraints.",
          },
          {
            title: "Sensitivity Analysis",
            text: "Conducted a Monte Carlo simulation using Latin Hypercube sampling to map the design space, revealing that aspect ratio has the greatest influence on L/D, while chord length drives cost per seat-mile.",
          },
          {
            title: "Stability & Control",
            text: "Implemented a digital Fly-By-Wire (FBW) active control system to counteract the inherent dynamic instabilities of the reflexed center body and outer wing sections.",
          },
        ],
      },
      {
        heading: "Key Engineering Decisions",
        items: [
          {
            title: "Cabin Architecture",
            text: "A triple-aisle (2-4-4-2) main cabin configuration housed within a PRSEUS (Pultruded Rod Stitched Efficient Unitized Structures) reinforced fuselage to handle asymmetric internal pressurization.",
          },
          {
            title: "Propulsion Integration",
            text: "Twin GEnX-1B high-bypass turbofan engines mounted on the aft upper-surface to maximize boundary layer ingestion (BLI) and provide acoustic shielding.",
          },
          {
            title: "Advanced Materials",
            text: "Carbon Fiber Reinforced Polymer (CFRP) and High Modulus Carbon Fiber used for primary lifting structures to minimize empty weight.",
          },
        ],
      },
      {
        heading: "Lessons Learned",
        items: [
          {
            title: "Optimization Boundaries",
            text: "Managing constraints in gradient-free optimization requires robust, carefully tuned penalty functions to avoid solver divergence.",
          },
          {
            title: "Aero-Structural Coupling",
            text: "Unconventional aircraft architectures demand tight integration between aerodynamic performance and structural volume constraints incredibly early in the design cycle.",
          },
        ],
      },
    ],
    workflow: [
      {
        step: "01",
        phase: "Initial Sizing & Mission Requirements",
        tools: ["Empirical Sizing", "MATLAB", "FAR Part 25"],
        desc: "Established hyper-fuel-efficient transport mission profile: Range 7,400 nmi at Mach 0.85 cruise, 40,000 ft altitude, 250 passenger capacity (2-4-4-2 cabin layout), MTOW 1,435,400 N (~322,700 lbf), and target CASM of $0.0873. Evaluated wing loading (W/S) and thrust-to-weight (T/W) master constraint envelopes.",
        output: "Mission Sizing Matrix: MTOW 1,435,400 N, Range 7,400 nmi, Target L/D 25.3",
      },
      {
        step: "02",
        phase: "Parametric CAD Lofting in NASA OpenVSP",
        tools: ["NASA OpenVSP", "Parametric Geometry Engine"],
        desc: "Lofted 3D blended airframe segmented into three reflected sections (centerbody cabin, blend fairing, high-aspect outer wing). Automated computation of wetted area (S_wet), parasitic drag coefficient (CD,0 = 0.0049), and Mean Aerodynamic Chord (MAC = 24.6 m).",
        output: "Parametric BWB Airframe Loft & Parasite Drag CD,0 = 0.0049",
      },
      {
        step: "03",
        phase: "Transonic Aerodynamics & Trim in MIT AVL",
        tools: ["MIT AVL (Athena Vortex Lattice)", "Potential Flow"],
        desc: "Executed extended vortex lattice model under transonic cruise conditions. Resolved neutral point (Np = 24.6 m, 101% MAC), cruise lift-curve slope (dCL/dalpha = 1.71 rad^-1), and normalized surface moments. Verified positive static margin (SM = 7.8% MAC with CG at 22.7 m / 92.8% MAC).",
        output: "Neutral Point Np = 24.6 m, SM = 7.8% MAC, dCL/dalpha = 1.71 rad^-1",
      },
      {
        step: "04",
        phase: "Gradient-Free Particle Swarm Optimization (PySwarms)",
        tools: ["Python", "PySwarms Library", "Master Script"],
        desc: "Implemented Particle Swarm Optimization (global-best topology, 40 particles, 25 iterations; cognitive=1.0, social=2.0, inertia=0.5) through an integrated Master Script. Maximized cruise L/D subject to Class E wingspan limits (b <= 65m), carbon-fiber spar stress limits (sigma <= sigma_CFRP / 1.5), and longitudinal static margin.",
        output: "Cruise L/D Converged: 24.85 -> 25.30 at Span b = 64.7 m (Sub-Gate E)",
      },
      {
        step: "05",
        phase: "Latin Hypercube Monte Carlo Sensitivity Analysis",
        tools: ["Latin Hypercube Sampling", "NumPy", "Spearman Rank"],
        desc: "Discretized design space cumulative distribution functions across N = 1,000 design evaluations with +/-40% parameter variations. Evaluated Spearman rank correlation: proved Aspect Ratio (AR = 5.03) has the strongest positive influence on cruise efficiency (L/D), while centerbody chord length dictates cost per seat-mile.",
        output: "Spearman Correlation Matrix & Structural Constraint Trade Frontiers",
      },
      {
        step: "06",
        phase: "Propulsion BLI Integration & Fly-By-Wire Dynamic Augmentation",
        tools: ["GEnX-1B Turbofan Data", "Flight Dynamics Eigensolver", "FBW Laws"],
        desc: "Integrated twin aft upper-surface GEnX-1B high-bypass turbofans with Boundary Layer Ingestion (BLI) and acoustic shielding. Calculated dynamic stability eigenvalues: identified unstable phugoid (lambda = +0.0012 +/- 0.0367i, zeta = -0.0314, T_double = 600s) and Dutch roll (zeta = 0.043), establishing the direct requirement for active Fly-By-Wire stability augmentation.",
        output: "Flight Control Augmentation Architecture & Validated BWB Synthesis",
      },
    ],
    reportFigures: {
      dragPolar: {
        cd0: 0.0049,
        cdi: 0.0029,
        cdw: 0.0003,
        cdTotal: 0.0081,
        clCruise: 0.21,
        ldCruise: 25.30,
        aoaCruise: "0.896°",
        dCldAlpha: "1.71 rad⁻¹",
      },
      massDistribution: [
        { category: "Fuel", massN: 614350, pct: 42.8, color: "#38bdf8" },
        { category: "Operating Empty Weight (OEW)", massN: 522500, pct: 36.4, color: "#818cf8" },
        { category: "Passenger Payload (250 pax)", massN: 240000, pct: 16.7, color: "#34d399" },
        { category: "Cargo Payload (LD-3)", massN: 58550, pct: 4.1, color: "#a1a1aa" },
      ],
      stabilityModes: [
        { mode: "Short Period", eigenvalues: "-0.5473 ± 1.71i", damping: "0.303", timeDouble: "—", level: "Level 2 (Adequate)" },
        { mode: "Phugoid Period", eigenvalues: "+0.0012 ± 0.0367i", damping: "-0.0314 (Unstable)", timeDouble: "600 s", level: "Level 3 (Requires FBW)" },
        { mode: "Roll Subsidence", eigenvalues: "-0.58", damping: "tau = 1.72 s", timeDouble: "—", level: "Level 2" },
        { mode: "Spiral Divergence", eigenvalues: "+0.074", damping: "tau = 13.3 s", timeDouble: "13.3 s", level: "Level 3" },
        { mode: "Dutch Roll", eigenvalues: "-0.036 ± 0.83i", damping: "0.043 (Unstable)", timeDouble: "8.36 s", level: "Level 2 (Requires FBW)" },
      ],
    },
  },
  {
    id: "citadel",
    title: "RC Aircraft Concept 'Citadel'",
    category: "Aircraft Design & Testing",
    tag: "02",
    size: "large",
    summary:
      "Detailed design of a profit-maximizing RC aircraft, 'Citadel', featuring a conventional tube-and-wing architecture. The design prioritizes volume payload capacity with a secondary emphasis on minimizing flight time and maximizing weight payload.",
    image: "/assets/citadel.jpg",
    gallery: ["/assets/citadel.jpg"],
    model: "/assets/citadel.glb",
    skills: ["MDO", "Python", "Neural Foil", "XFLR5", "SolidWorks"],
    pdfs: [
      { title: "Design Review (DDR)", url: "/assets/MAE155B_DDR.pdf" },
      { title: "Final Report (FDR)", url: "/assets/MAE155B_T3_FDR_Report.pdf" },
    ],
    sections: [
      {
        heading: "Design Optimization & Analysis",
        items: [
          {
            title: "Multidisciplinary Design Optimization (MDO)",
            text: "Employed a gradient-based solver in Python (JAX, modOpt, IPOPT) to evaluate 24 constraints across aerodynamics, stability, electrical, and physical packaging to maximize profit ($/hr).",
          },
          {
            title: "Sensitivity Analysis",
            text: "Sampled the design space 1e9 times via Monte Carlo simulation, using a Spearman Rank Correlation to prove volume payload and flight time as the most influential parameters.",
          },
          {
            title: "High-Lift Aerodynamics",
            text: "Utilized a high-lift S1223 airfoil optimized via Neural Foil to maximize lift and aerodynamic efficiency, extrapolated to 3D using Prandtl's lifting line correction.",
          },
        ],
      },
      {
        heading: "Lessons Learned",
        items: [
          {
            title: "Manufacturing Tolerances",
            text: "Physical manufacturing tolerances in materials like foam significantly impact the theoretical lift calculated by ideal CFD solvers.",
          },
          {
            title: "Engineering Intuition in MDO",
            text: "MDO algorithms can save hundreds of manual trade study hours but rely entirely on the engineering intuition used to set initial boundary conditions.",
          },
        ],
      },
    ],
    workflow: [
      {
        step: "01",
        phase: "Scoring Sensitivity & Monte Carlo Sampling",
        tools: ["Python", "NumPy", "Spearman Correlation"],
        desc: "Formulated the objective function to maximize competition profit ($/hr). Bounded by historical competition data, sampled the multi-dimensional design space 1e9 times. Spearman Rank Correlation isolated payload volume (V_p) and flight time (T_f) as the decisive parameters governing net vehicle profitability.",
        output: "10^9 Monte Carlo Samples & Identified Profit Drivers (V_p, T_f)",
      },
      {
        step: "02",
        phase: "Gradient-Based MDO Engine (JAX / modOpt / IPOPT)",
        tools: ["Python", "JAX AutoDiff", "modOpt", "IPOPT Solver"],
        desc: "Implemented a gradient-based Multidisciplinary Design Optimization framework. Optimized 9 design variables [W_p, V_p, V_cruise, S_wing, S_ht, S_vt, X_wing_frac, X_total, X_battery_frac] normalized to O(1) to avoid ill-conditioning, satisfying 24 active constraints across aerodynamic performance, structural integrity, static stability, and geometric packaging.",
        output: "Optimal Aircraft Sizing: 2.04 kg MTOW, 7.22 L Bay, S_wing = 0.412 m²",
      },
      {
        step: "03",
        phase: "High-Lift Selig S1223 Aerodynamic Wing Design",
        tools: ["NeuralFoil", "XFLR5", "Prandtl Lifting-Line"],
        desc: "Selected high-camber Selig S1223 airfoil (12.1% thickness-to-chord) optimized via NeuralFoil to maximize lift coefficient (CL_max = 2.1) across low-speed flight conditions. Sized a high-aspect wing supported by twin carbon fiber spars at maximum t/c and CNC hot-wire cut XPS foam cores seated in a female fuselage saddle.",
        output: "Airfoil Section CL_max = 2.1, 30% Span Ailerons, Twin Carbon Spars",
      },
      {
        step: "04",
        phase: "Propulsion Matching & Torque Balance Surrogate",
        tools: ["APC Propeller Data", "Motor Dynamometer Model", "ESC Analytics"],
        desc: "Modeled steady-state torque balance for candidate SunnySky X2216 V3 brushless motors paired with 2D surrogate models of APC propeller thrust and torque vs advance ratio (J). Sized an APC 10x7E propeller delivering 23.5 N static thrust while guaranteeing operating current remains safely below the 35A ESC thermal limit at 28.4 A.",
        output: "Selected SunnySky X2216 V3 + APC 10x7E Propeller (28.4 A < 35 A limit)",
      },
      {
        step: "05",
        phase: "Laser-Cut Airframe & Twin-Servo Bomb-Bay Fabrication",
        tools: ["Laser Cutter", "SolidWorks CAD", "3D Printing PLA Aero"],
        desc: "Constructed a 12-rib built-up plywood fuselage (4.064mm) reinforced by dual upper carbon fiber rods and lower balsa stringers. Designed a 7.22 L volume payload bay (0.0962m x 0.0962m x 0.780m) featuring twin bay doors driven by independent dedicated micro-servos (0° closed, 90° open) and an aerodynamic 3D-printed PLA Aero nose cone with cooling ducts.",
        output: "Fabricated Airframe (1.05 kg Empty) with 7.22 L Payload Release Bay",
      },
      {
        step: "06",
        phase: "Ground Roll Taxi & Full-Load Structural Verification",
        tools: ["Paved Runway Testing", "Fingertip Load Stand", "Servo DAQ"],
        desc: "Conducted 10-meter ground roll test at 20% throttle confirming straight-line roll stability with zero nose-over tendency. Conducted full-weight fingertip wingtip structural load test at 20.02 N (2.04 kg gross weight) with zero visible wing deflection, and validated dynamic payload door release under simulated flight vibration.",
        output: "Successful 10m Ground Roll, 20.02 N Structural Load Test, 100% Drop Reliability",
      },
    ],
    reportFigures: {
      massBudget: [
        { component: "Airframe (Plywood ribs, XPS foam, Monokote)", massKg: 1.05, pct: 47.6, color: "#818cf8" },
        { component: "Water Weight Payload", massKg: 0.85, pct: 38.5, color: "#38bdf8" },
        { component: "Avionics, Servos & 3S LiPo Battery", massKg: 0.17, pct: 7.6, color: "#34d399" },
        { component: "Volume Payload Box (7.22 L)", massKg: 0.14, pct: 6.3, color: "#a1a1aa" },
      ],
      mdoStateVector: [
        { var: "W_p", name: "Payload Weight", optimal: "0.85 kg", constraint: "Max structural margin" },
        { var: "V_p", name: "Payload Volume", optimal: "7.22 L (0.096m x 0.096m x 0.78m)", constraint: "Fuselage bay width/length bounds" },
        { var: "V_cruise", name: "Cruise Speed", optimal: "16.4 m/s", constraint: "Stall margin V_stall < 11.2 m/s" },
        { var: "S_wing", name: "Wing Area", optimal: "0.412 m²", constraint: "Aspect ratio & tip stall margin" },
        { var: "S_ht", name: "Horizontal Tail Area", optimal: "0.078 m²", constraint: "Static Margin = 12% MAC" },
        { var: "S_vt", name: "Vertical Tail Area", optimal: "0.046 m²", constraint: "Dutch roll yaw stability" },
        { var: "X_battery", name: "Battery CG Station", optimal: "0.32 c", constraint: "Tunable longitudinal balance" },
      ],
      propulsionData: [
        { prop: "APC 10x7E", motor: "SunnySky X2216 V3", staticThrust: "23.5 N", cruiseCurrent: "28.4 A", escLimit: "35.0 A", status: "Optimal (Cruise thrust margin 1.8x)" },
        { prop: "APC 11x5.5E", motor: "SunnySky X2216 V3", staticThrust: "21.8 N", cruiseCurrent: "26.1 A", escLimit: "35.0 A", status: "Suboptimal high-speed cruise thrust" },
        { prop: "APC 11x7E", motor: "SunnySky X2216 V3", staticThrust: "25.2 N", cruiseCurrent: "36.8 A", escLimit: "35.0 A", status: "Over-current (> 35A ESC limit)" },
      ],
    },
  },
  {
    id: "cfd-rocket",
    title: "Vortex-Cooled Rocket Engine CFD",
    category: "CFD & Simulation",
    tag: "03",
    size: "large",
    summary:
      "Conducted Computational Fluid Dynamics (CFD) simulations to investigate the thermal dissipation effectiveness of the Project Maelstrom vortex-cooled rocket engine. This cooling system utilizes oxidizer injection to generate a protective swirling flow field between the chamber wall and the hotter core flow.",
    image: "/assets/image5.png",
    gallery: ["/assets/image5.png", "/assets/image6.png", "/assets/image12.png"],
    skills: ["Ansys Fluent", "CFD", "Heat Transfer", "Fluid Mechanics"],
    pdfs: [
      { title: "CFD Final Report", url: "/assets/MAE 185 Final Report.pdf" },
    ],
    sections: [
      {
        heading: "Key Technical Contributions",
        items: [
          {
            title: "Heat Transfer Analysis",
            text: "Ran analyses across three flow conditions (maximum, half, and quarter) to evaluate the influence of oxidizer mass flow rates on vortex formation and boundary thermal layer integrity.",
          },
          {
            title: "Thermal Mapping",
            text: "Mapped chamber, cross, nozzle, and plenum plane temperatures to quantify insulation effectiveness and pinpoint thermal hot spots.",
          },
          {
            title: "Flow Thresholds",
            text: "Demonstrated that a minimum threshold of oxidizer flow is required to sustain the vortex structure; lower flow rates caused vortex decay and direct thermal exposure.",
          },
        ],
      },
      {
        heading: "Lessons Learned",
        items: [
          {
            title: "Grid Independence",
            text: "High-fidelity CFD demands intense mesh sensitivity studies to guarantee that thermal results aren't strictly a byproduct of grid resolution.",
          },
          {
            title: "Boundary Layer Sensitivity",
            text: "Vortex cooling efficacy is highly volatile and heavily dependent on specific boundary layer attachment conditions.",
          },
        ],
      },
    ],
    reportFigures: {
      vortexThermalData: [
        { station: "Injector Plenum", wallTempK: 300, coreTempK: 2850, heatFluxMW: 0.12, regime: "Helical Oxidizer Film" },
        { station: "Mid-Chamber", wallTempK: 580, coreTempK: 3100, heatFluxMW: 0.85, regime: "Stable Bidirectional Vortex" },
        { station: "Convergence Zone", wallTempK: 890, coreTempK: 3250, heatFluxMW: 1.92, regime: "Vortex Inversion Transition" },
        { station: "Nozzle Throat", wallTempK: 1120, coreTempK: 3300, heatFluxMW: 2.85, regime: "Hot Gas Exhaust Core" },
      ],
      coolingEffectiveness: [
        { flowRate: "Maximum Flow (100% m_ox)", wallTempReduction: "46.2% Wall Temperature Drop", coreInsulation: "Full Coaxial Isolation" },
        { flowRate: "Half Flow (50% m_ox)", wallTempReduction: "29.4% Wall Temperature Drop", coreInsulation: "Partial Core Dissipation" },
        { flowRate: "Quarter Flow (25% m_ox)", wallTempReduction: "11.8% Wall Temperature Drop", coreInsulation: "Vortex Boundary Breakdown" },
      ],
    },
  },
  {
    id: "wing-spar",
    title: "Wing Spar Structural Analysis",
    category: "Structures & Sizing",
    tag: "04",
    size: "large",
    summary:
      "Structural sizing and comparison study for a thin-walled wingbox (single-cell) under representative aerodynamic and inertial loading. The report evaluates stress flow behavior, bending/shear response, and weight tradeoffs between an aluminum baseline and a composite alternative.",
    image: "/assets/wing_spar.jpg",
    gallery: ["/assets/wing_spar.jpg"],
    skills: ["MATLAB", "Thin-Walled Beam Theory", "Shear Flow", "Structural Sizing"],
    pdfs: [
      { title: "Wing Analysis Report", url: "/assets/Wing_Analysis_Zaltzman_Gregorio.pdf" },
    ],
    reportFigures: {
      materialComparison: [
        { metric: "Structural Mass", al7075: "46.8 kg", carbonEpoxy: "14.8 kg", delta: "-68.4% Weight Reduction", winner: "Carbon/Epoxy" },
        { metric: "Ultimate Tensile Strength", al7075: "503 MPa", carbonEpoxy: "1250 MPa", delta: "+148.5% Strength", winner: "Carbon/Epoxy" },
        { metric: "Specific Stiffness (E/rho)", al7075: "25.7 GPa/(g/cm³)", carbonEpoxy: "85.2 GPa/(g/cm³)", delta: "+231.5% Efficiency", winner: "Carbon/Epoxy" },
        { metric: "Max Shear Stress", al7075: "142 MPa", carbonEpoxy: "88 MPa", delta: "-38.0% Shear Stressed", winner: "Carbon/Epoxy" },
      ],
      loadCaseMargins: [
        { case: "PHAA (Positive High AoA)", loadFactor: "+3.8 g", maxStressMPa: "342 MPa", marginOfSafety: "+0.18", status: "Compliant" },
        { case: "PLAA (Positive Low AoA)", loadFactor: "+3.8 g", maxStressMPa: "298 MPa", marginOfSafety: "+0.32", status: "Compliant" },
        { case: "NHAA (Negative High AoA)", loadFactor: "-1.5 g", maxStressMPa: "185 MPa", marginOfSafety: "+0.14", status: "Compliant" },
        { case: "NLAA (Negative Low AoA)", loadFactor: "-1.5 g", maxStressMPa: "162 MPa", marginOfSafety: "+0.28", status: "Compliant" },
      ],
    },
    codeSnippet: `% =========================================================================
% Wing Spar Structural Analysis Script
% Author: Gregorio Zaltzman D'Ambrosio
% Scope: Modulus Weighted Section Properties & Thin-Walled Shear Flow
% =========================================================================
function [EI_eff, q_distribution, sigma_bending] = analyzeWingBox(geom, loads, mat)
    % Discretize skin-stringer single-cell cross section
    n_nodes = length(geom.x);
    y_bar = sum(mat.E .* geom.A .* geom.y) / sum(mat.E .* geom.A);
    
    % Modulus-weighted moment of inertia (Ixx, Iyy, Ixy)
    Ixx_eff = sum(mat.E .* geom.A .* (geom.y - y_bar).^2);
    fprintf('[INFO] Modulus-weighted flexural rigidity EI: %.3e N*m^2\\n', Ixx_eff);
    
    % Bending stresses at outer fibers
    sigma_bending = (loads.M_bend * (geom.y - y_bar) * mat.E(1)) / Ixx_eff;
    
    % Shear flow calculation (Bredt-Batho & Open Section integration)
    q_open = zeros(n_nodes, 1);
    for i = 1:n_nodes-1
        q_open(i+1) = q_open(i) - (loads.V_shear / Ixx_eff) * mat.E(i) * geom.A(i) * (geom.y(i) - y_bar);
    end
    
    % Close cell with twist compatibility: dtheta/dz = (1 / 2*A_encl) * oint(q / (G*t)) ds = 0
    q_0 = - sum(q_open .* geom.ds ./ (mat.G .* geom.t)) / sum(geom.ds ./ (mat.G .* geom.t));
    q_distribution = q_open + q_0;
    
    fprintf('[SUCCESS] Sizing converged: Max Shear Flow = %.2f N/mm, Max Stress = %.2f MPa\\n', ...
        max(abs(q_distribution)), max(abs(sigma_bending)) * 1e-6);
end`,
    sections: [
      {
        heading: "Key Highlights",
        items: [
          {
            title: "Classical Aerostructures",
            text: "Applied thin-walled beam theory, modulus-weighted section properties, and closed-cell shear flow interpretation.",
          },
          {
            title: "Material Trade Study",
            text: "Carbon/Epoxy concept achieved substantial mass savings relative to the aluminum baseline while satisfying margin of safety thresholds.",
          },
        ],
      },
      {
        heading: "Lessons Learned",
        items: [
          {
            title: "Analytical Baseline Value",
            text: "Classical thin-walled theory provides excellent baseline estimates and an essential sanity check before transitioning to heavy FEA solvers.",
          },
          {
            title: "Stiffness-Driven Load Paths",
            text: "Material stiffness differentials heavily dictate internal load paths in built-up cross sections.",
          },
        ],
      },
    ],
  },
  {
    id: "wind-tunnel",
    title: "Wind Tunnel Aerodynamic Analysis",
    category: "Aerodynamic Testing",
    tag: "05",
    size: "large",
    summary:
      "Experimental investigation of the aerodynamic characteristics of a Clark Y-14 airfoil in a low-speed, incompressible wind tunnel environment. The primary objective was to determine lift, drag, and pitching moment characteristics across a range of freestream velocities and angles of attack, including pre-stall and post-stall behavior.",
    image: "/assets/wt_setup.png",
    gallery: [
      "/assets/wt_setup.png",
      "/assets/wt_picture.png",
      "/assets/wt_components.png",
      "/assets/wt_forces.png",
    ],
    skills: ["Experimental Aerodynamics", "Wind Tunnel Testing", "LabVIEW", "Data Acquisition"],
    pdfs: [
      { title: "Aerodynamic Testing Report", url: "/assets/MAE 175 WT  (1).pdf" },
    ],
    reportFigures: {
      polarComparison: [
        { alphaDeg: "0°", cl_20ms: 0.24, cl_35ms: 0.25, cl_50ms: 0.25, cd: 0.0125, cmLE: -0.068 },
        { alphaDeg: "4°", cl_20ms: 0.58, cl_35ms: 0.59, cl_50ms: 0.60, cd: 0.0195, cmLE: -0.065 },
        { alphaDeg: "8°", cl_20ms: 0.94, cl_35ms: 0.95, cl_50ms: 0.96, cd: 0.0340, cmLE: -0.061 },
        { alphaDeg: "12°", cl_20ms: 1.28, cl_35ms: 1.30, cl_50ms: 1.31, cd: 0.0620, cmLE: -0.054 },
        { alphaDeg: "14.5° (Stall)", cl_20ms: 1.36, cl_35ms: 1.38, cl_50ms: 1.39, cd: 0.0910, cmLE: -0.048 },
        { alphaDeg: "16° (Post-Stall)", cl_20ms: 1.15, cl_35ms: 1.18, cl_50ms: 1.20, cd: 0.1480, cmLE: -0.032 },
      ],
      wakeSurveyRake: [
        { y_over_c: -0.5, normDeficit: 0.02 },
        { y_over_c: -0.3, normDeficit: 0.06 },
        { y_over_c: -0.15, normDeficit: 0.38 },
        { y_over_c: 0.0, normDeficit: 0.76 },
        { y_over_c: 0.15, normDeficit: 0.42 },
        { y_over_c: 0.3, normDeficit: 0.05 },
        { y_over_c: 0.5, normDeficit: 0.01 },
      ],
      experimentalParameters: {
        airfoil: "Clark Y-14 (14% thickness ratio)",
        velocities: "20 m/s (Re = 1.3e5), 35 m/s (Re = 2.4e5), 50 m/s (Re = 3.4e5)",
        instrumentation: "Multi-port static pressure taps + 18-port downstream wake rake + strain-gauge sting balance",
        findings: "Incompressible flow invariance confirmed; lift slope dCL/dalpha ~ 0.082 deg^-1 up to stall.",
      },
    },
    sections: [
      {
        heading: "Key Experimental Highlights",
        items: [
          {
            title: "Wind Tunnel Calibration",
            text: "Established accurate dynamic pressure and velocity relationships between fan motor RPM and test section freestream conditions.",
          },
          {
            title: "Pressure Integration",
            text: "Obtained surface pressure distributions using multi-channel pressure taps integrated along the chord to directly compute normal and axial force coefficients.",
          },
          {
            title: "Wake Survey Method",
            text: "Employed the wake-survey momentum deficit analysis via pitot-static rake downstream to isolate profile and form drag.",
          },
        ],
      },
      {
        heading: "Lessons Learned",
        items: [
          {
            title: "Uncertainty Propagation",
            text: "Rigorous calibration and uncertainty propagation are arguably as important as the physical data acquisition itself.",
          },
          {
            title: "Wall Interference Corrections",
            text: "Solid blockage and streamline curvature severely skew high Angle-of-Attack (AoA) data without proper wind tunnel correction factors.",
          },
        ],
      },
    ],
  },
  {
    id: "seaglide",
    title: "SeaGlide Autonomous Underwater Vehicle",
    category: "Hydrodynamics & Systems",
    tag: "06",
    size: "half",
    summary:
      "Design, build, and performance analysis of a miniature autonomous underwater glider ('SeaGlide') for MAE 190. The vehicle propels itself by actively altering its buoyancy and center of gravity to create vertical motion, which is translated into forward glide by fixed hydrodynamic wings.",
    image: "/assets/seaglide.jpg",
    gallery: ["/assets/seaglide.jpg"],
    video: "/assets/seaglide.mp4",
    skills: ["Hydrodynamics", "Buoyancy Engine", "MATLAB", "AUV Design", "Hardware Assembly"],
    pdfs: [
      { title: "SeaGlide Technical Report", url: "/assets/seaglide.pdf" },
    ],
    sections: [
      {
        heading: "System Architecture",
        items: [
          {
            title: "Hull & Pressure Vessel",
            text: "Assembled using a watertight cylindrical housing modified with custom 3D-printed internal chassis brackets.",
          },
          {
            title: "Variable Buoyancy Engine",
            text: "Utilized a motorized lead-screw syringe system coupled with shifting internal battery mass to cycle vehicle pitch and buoyancy.",
          },
        ],
      },
      {
        heading: "Lessons Learned",
        items: [
          {
            title: "Dynamic Mechanical Seals",
            text: "Waterproofing dynamic mechanical seals under pressure often poses a stricter engineering constraint than hydrodynamic wing design.",
          },
          {
            title: "Volumetric Precision",
            text: "Internal buoyancy control requires extremely precise volumetric displacement calculations and center of gravity mapping.",
          },
        ],
      },
    ],
  },
  {
    id: "orbit-det",
    title: "Orbit Determination for LEO Satellite",
    category: "Orbital Simulation",
    tag: "07",
    size: "half",
    summary:
      "Developed and evaluated a MATLAB-based orbit determination algorithm for a low Earth orbit (LEO) satellite, modeled after NASA's QuickSCAT mission. The nonlinear force model incorporated two-body gravity, J2 oblateness, and exponential atmospheric drag.",
    image: "/assets/orbit_plot_placeholder.png",
    gallery: ["/assets/orbit_plot_placeholder.png"],
    skills: ["MATLAB", "Kalman Filters", "Orbital Mechanics", "Data Estimation"],
    pdfs: [
      { title: "LEO Orbit Determination Paper", url: "/assets/MAE 182 Project.pdf" },
    ],
    reportFigures: {
      filterComparison: [
        { metric: "Range Post-Fit Residual (RMS)", batchLeastSquares: "0.0097 m", sequentialEKF: "0.1161 m", unit: "m", note: "Batch converged in 4 iterations" },
        { metric: "Range-Rate Post-Fit Residual (RMS)", batchLeastSquares: "0.000998 m/s", sequentialEKF: "0.001405 m/s", unit: "m/s", note: "Sub-millimeter/sec precision" },
        { metric: "Position Error Semi-Axes", batchLeastSquares: "Millimeter scale (3σ)", sequentialEKF: "Centimeter scale (3σ)", unit: "ellipsoid", note: "Joseph covariance formulation" },
        { metric: "State Formulation", batchLeastSquares: "18-state Batch Differential", sequentialEKF: "Continuous-Discrete EKF", unit: "algorithm", note: "Riccati / normal equation solution" },
      ],
      missionOrbit: {
        satellite: "QuickSCAT Replica",
        orbitType: "Sun-Synchronous LEO",
        altitude: "800 km",
        inclination: "98.6°",
        trackingStations: "3 Ground Stations (Range & Range-Rate)",
        forceModel: "Two-body Newtonian gravity + J2 Earth oblateness + Exponential atmospheric drag",
      },
      stateElements: [
        { parameter: "Position Vector (r_x, r_y, r_z)", dimension: "3 States", uncertainty: "±0.004 m" },
        { parameter: "Velocity Vector (v_x, v_y, v_z)", dimension: "3 States", uncertainty: "±0.0008 m/s" },
        { parameter: "Atmospheric Drag Coeff (C_D)", dimension: "1 Parameter", uncertainty: "±0.012" },
        { parameter: "Ground Station Coordinates (X_s, Y_s, Z_s)", dimension: "9 Coordinates (3 stns)", uncertainty: "±0.002 m" },
        { parameter: "Range & Range-Rate Biases", dimension: "2 Parameters", uncertainty: "±0.001 m / ±0.0001 m/s" },
      ],
    },
    sections: [
      {
        heading: "Algorithmic Formulation",
        items: [
          {
            title: "Batch Least-Squares",
            text: "Implemented a nonlinear batch least-squares differential correction regression model for high-accuracy orbital element reconstruction.",
          },
          {
            title: "Extended Kalman Filtering (EKF)",
            text: "Developed a sequential Kalman filter for real-time continuous state estimation, propagating covariance matrices alongside orbital state vectors.",
          },
        ],
      },
      {
        heading: "Lessons Learned",
        items: [
          {
            title: "Process Noise Tuning",
            text: "Extended Kalman Filters are highly susceptible to covariance divergence if process noise (Q) isn't carefully tuned against sensor measurement noise (R).",
          },
          {
            title: "Orbital Perturbations",
            text: "Accounting for J2 geopotential oblateness is an absolute necessity for achieving realistic orbital propagation in LEO.",
          },
        ],
      },
    ],
  },
  {
    id: "piston-engine",
    title: "4-Piston Engine CAD & Kinematics",
    category: "CAD & Kinematics",
    tag: "08",
    size: "half",
    summary:
      "Mechanical CAD assembly project demonstrating multi-part modeling, constraint-based assemblies, and motion-driven kinematic verification in SolidWorks. The emphasis was on clean part construction, proper mate tolerance, and mechanism synchronization.",
    image: "/assets/4pistonengine.jpg",
    gallery: ["/assets/4pistonengine.jpg"],
    model: "/assets/piston_engine.glb",
    video: "/assets/piston_engine.mp4",
    skills: ["SolidWorks", "Mechanical Design", "Assemblies", "Kinematics"],
    sections: [
      {
        heading: "Mechanism Design",
        items: [
          {
            title: "Parametric Part Modeling",
            text: "Engine block, crankshaft, connecting rods, wrist pins, and pistons designed with parametric geometric dimensioning and tolerancing (GD&T).",
          },
          {
            title: "Kinematic Motion Verification",
            text: "Conducted dynamic motion studies to analyze velocity and acceleration profiles across stroke cycles, preventing clearance clashes.",
          },
        ],
      },
      {
        heading: "Lessons Learned",
        items: [
          {
            title: "Top-Down Assembly",
            text: "Top-down skeleton assembly design prevents cascading mate reference failures during iterative geometry changes.",
          },
          {
            title: "Physical Clearances",
            text: "Incorporating realistic manufacturing tolerances directly into CAD mating surfaces is mandatory for authentic kinematic studies.",
          },
        ],
      },
    ],
  },
  {
    id: "lab-ops",
    title: "Experimental Laboratory Work",
    category: "Experimental Thermodynamics",
    tag: "09",
    size: "half",
    summary:
      "Hands-on experimental engineering across acoustics and heat transfer, emphasizing instrumentation, repeatable data collection, and signal post-processing. The focus was on translating physical conservation equations into measurable experimental results.",
    image: "/assets/lab_work.gif",
    gallery: ["/assets/lab_work.gif"],
    skills: ["MATLAB", "Arduino", "DAQ", "Signal Processing"],
    pdfs: [
      { title: "Lab Report 1: Heat Transfer", url: "/assets/lab_report_1.pdf" },
      { title: "Lab Report 2: Acoustics & Signal", url: "/assets/lab_report_2.pdf" },
    ],
    sections: [
      {
        heading: "Experimental Domains",
        items: [
          {
            title: "Thermodynamics & Heat Transfer",
            text: "Validated lumped-capacitance and transient convective cooling models using thermocouple arrays and automated DAQ logging.",
          },
          {
            title: "Acoustics & Signal Analysis",
            text: "Measured and processed acoustic time-domain microphone signals under ambient noise, applying Butterworth filtering and FFT spectra.",
          },
        ],
      },
      {
        heading: "Lessons Learned",
        items: [
          {
            title: "Digital Filtering",
            text: "Digital signal conditioning (e.g. Butterworth low-pass and notch filters) is mandatory for extracting clean frequency data from noisy physical sensors.",
          },
          {
            title: "Convective Sensitivity",
            text: "Convective heat transfer coefficients fluctuate substantially with room drafts, requiring extensive ensemble averaging.",
          },
        ],
      },
    ],
  },
];