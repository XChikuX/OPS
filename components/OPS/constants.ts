const buttonData = [
    { label: 'O', color: 'bg-blue-500', definition:'Observer', description: 'Stuck on info & pathways, not stuck on others point of view', criteria: "Look for negative reaction to talking about things over people", icon: require('@/assets/images/ops/icon.png') },
    { label: 'D', color: 'bg-orange-300', definition:'Decider', description: 'Stuck on people, judgment, fairness, not stuck on missing info', criteria: "Look for a more serious voice when dealing with people", icon: require('@/assets/images/ops/icon.png') },
    { label: 'Di', color: 'bg-blue-500', definition:'Looks Inward for Decisions', description: 'Me-story, what I want, I\'m allowed, leaves the tribe behind', criteria: "Watch for 'my way' even if other people are involved in the stories.", icon: require('@/assets/images/ops/icon.png') },
    { label: 'De', color: 'bg-orange-300', definition:'Prioritises Tribal Decisions', description: 'We-story, drags in others, void in what they want, not allowed', criteria: "Watch for 'He said, She said' talk", icon: require('@/assets/images/ops/icon.png') },
    { label: 'Oi', color: 'bg-gray-300', definition:'Narrowed Observations', description: 'Has a way, same story, concludes, narrows, shoves away new', criteria: "Watch for effort in sticking to the same topic", icon: require('@/assets/images/ops/icon.png') },
    { label: 'Oe', color: 'bg-blue-500', definition:'Scattered Observations', description: 'Channel change, we\'ll see, wants control - but doesn\'t', criteria: "Watch for struggle in staying in the same topic", icon: require('@/assets/images/ops/icon.png') },
    { label: 'N', color: 'bg-gray-300', definition:'Intuition', description: 'Summarizing, categories, abstract, void in supporting facts', criteria: "Lack of exact examples", icon: require('@/assets/images/ops/icon.png') },
    { label: 'S', color: 'bg-gray-300', definition:'Sensory', description: 'Proving, gives facts, grounded, not jumping or summarizing', criteria: "Overuse of exact examples", icon: require('@/assets/images/ops/icon.png') },
    { label: 'F', color: 'bg-gray-300', definition:'Feeling', description: 'Values, likes, hates, weak reasons, won\'t make it work', criteria: "Watch for emotional connects of likes/dislikes", icon: require('@/assets/images/ops/icon.png') },
    { label: 'T', color: 'bg-gray-300', definition:'Thinking', description: 'Works, get it done, logic, reasons, unowned emotions', criteria: "Watch for explainations of how things work, getting stuff done", icon: require('@/assets/images/ops/icon.png') },
    { label: 'Sleep', color: 'bg-blue-500', definition:'Processing / Meditating', description: 'Same story about self, processed, resolved, won\'t jump in', criteria: "Watch for mope, slow talk in prolonged conversations", icon: require('@/assets/images/ops/icon.png') },
    { label: 'Play', color: 'bg-orange-300', definition:'Ping Pong with the tribe', description: 'Random story about others, unresolved, won\'t hit the brakes', criteria: "Watch for quick wittedness with self and tribe.", icon: require('@/assets/images/ops/icon.png') },
    { label: 'Consume', color: 'bg-gray-300', definition:'Savouring / Worldview Changing', description: 'Random story about self, takes you along, trails off, not ready', criteria: "Watch for relaxed talk", icon: require('@/assets/images/ops/icon.png') },
    { label: 'Blast', color: 'bg-orange-300', definition:'Teaching / Working', description: 'Same story about others, lessons, jumps in, overextended', criteria: "Watch for teachings, logical or emotional", icon: require('@/assets/images/ops/icon.png') },
    { label: 'Info', color: 'bg-green-300', definition:'On Point - B & C in top 3', description: 'Balance in learning and sharing info, works/rests in swings', criteria: "Sticks to information", icon: require('@/assets/images/ops/icon.png') },
    { label: 'Energy', color: 'bg-yellow-300', definition:'Quirky - S & P in top 3', description: 'Balance in work and rest, learns/talks in swings', criteria: "Sticks to playfullness", icon: require('@/assets/images/ops/icon.png') },
    { label: 'I', color: 'bg-red-300', definition:'Introvert', description: 'Always "kicked" by the tribe to talk and move, outbursts later', criteria: "Decided by top 3 coins", icon: require('@/assets/images/ops/icon.png') },
    { label: 'E', color: 'bg-purple-300', definition:'Extravert', description: 'Always tiring out self and tribe, then crashes later', criteria: "Decided by top 3 coins", icon: require('@/assets/images/ops/icon.png') },
  ];

  
  export const buttonPairs = [
    ['O', 'D'],
    ['Di', 'De'],
    ['Oi', 'Oe'],
    ['N', 'S'],
    ['F', 'T'],
    ['Sleep', 'Play'],
    ['Consume', 'Blast'],
    ['Info', 'Energy'],
    ['I', 'E']
  ];
  
  export const observers = ["Ni", "Si", "Ne", "Se"];
  export const deciders = ["Fi", "Ti", "Fe", "Te"];
  export const de = ["Te", "Fe"];
  export const di = ["Ti", "Fi"];
  export const oi = ["Si", "Ni"];
  export const oe = ["Se", "Ne"];
  export const n = ["Ni", "Ne"];
  export const s = ["Si", "Se"];
  export const f = ["Fi", "Fe"];
  export const t = ["Ti", "Te"];