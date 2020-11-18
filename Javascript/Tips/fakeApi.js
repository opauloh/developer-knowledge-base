var API = {};

function fail() {
  return Math.floor(Math.random() * (5 - 1)) === 3;
}

function generateId() {
  return Math.random().toString(36).substring(2);
}

var goals = [
  {
    id: generateId(),
    name: 'Learn Redux',
  },
  {
    id: generateId(),
    name: 'Read 50 books this year',
  },
];
var inbox = [
  {
    id: generateId(),
    company: {
      id: '1',
      name: 'Elasticontent',
      logo: 'https://www.iconsdb.com/icons/preview/purple/rocket-xxl.png',
    },
    new: true,
    active: false,
    starred: false,
    title: 'Briefing mês de julho 01',
    datetime: new Date(),
    responsible: {
      id: '1',
      name: 'Drieli Lopes',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvL8VK49O_3-UUwrUQhbfs_pnXTBGBYjm40g&usqp=CAU',
    },
    status: 'UPDATING',
    description: 'Esse é o conteúdo que será abordado durante o mês de julho',
  },
  {
    id: generateId(),
    company: {
      id: '1',
      name: 'Elasticontent',
      logo: 'https://www.iconsdb.com/icons/preview/purple/rocket-xxl.png',
    },
    new: true,
    active: false,
    starred: false,
    title: 'Briefing mês de julho 01',
    datetime: new Date(),
    responsible: {
      id: '1',
      name: 'Drieli Lopes',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvL8VK49O_3-UUwrUQhbfs_pnXTBGBYjm40g&usqp=CAU',
    },
    status: 'APPROVING',
    description: 'Esse é o conteúdo que será abordado durante o mês de julho',
  },
  {
    id: generateId(),
    company: {
      id: '1',
      name: 'Elasticontent',
      logo: 'https://www.iconsdb.com/icons/preview/purple/rocket-xxl.png',
    },
    new: false,
    active: false,
    starred: true,
    title: 'Briefing mês de julho 01',
    datetime: new Date(),
    responsible: {
      id: '1',
      name: 'Drieli Lopes',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvL8VK49O_3-UUwrUQhbfs_pnXTBGBYjm40g&usqp=CAU',
    },
    status: 'PRODUCTION',
    description: 'Esse é o conteúdo que será abordado durante o mês de julho',
  },
  {
    id: generateId(),
    company: {
      id: '1',
      name: 'Elasticontent',
      logo: 'https://www.iconsdb.com/icons/preview/purple/rocket-xxl.png',
    },
    new: false,
    active: true,
    starred: false,
    title: 'Briefing mês de julho 01',
    datetime: new Date(),
    responsible: {
      id: '1',
      name: 'Drieli Lopes',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvL8VK49O_3-UUwrUQhbfs_pnXTBGBYjm40g&usqp=CAU',
    },
    status: 'PRODUCTION',
    description:
      '😃 Esse é o conteúdo que será abordado durante o mês de julho',
  },
  {
    id: generateId(),
    company: {
      id: '1',
      name: 'Elasticontent',
      logo: 'https://www.iconsdb.com/icons/preview/purple/rocket-xxl.png',
    },
    new: false,
    active: false,
    starred: true,
    title: 'Briefing mês de julho 01',
    datetime: new Date(),
    responsible: {
      id: '1',
      name: 'Drieli Lopes',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvL8VK49O_3-UUwrUQhbfs_pnXTBGBYjm40g&usqp=CAU',
    },
    status: 'PRODUCTION',
    description: 'Esse é o conteúdo que será abordado durante o mês de julho',
  },
  {
    id: generateId(),
    company: {
      id: '1',
      name: 'Elasticontent',
      logo: 'https://www.iconsdb.com/icons/preview/purple/rocket-xxl.png',
    },
    new: false,
    active: false,
    starred: true,
    title: 'Briefing mês de julho 01',
    datetime: new Date(),
    responsible: {
      id: '1',
      name: 'Drieli Lopes',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvL8VK49O_3-UUwrUQhbfs_pnXTBGBYjm40g&usqp=CAU',
    },
    status: 'PRODUCTION',
    description: 'Esse é o conteúdo que será abordado durante o mês de julho',
  },
  {
    id: generateId(),
    company: {
      id: '1',
      name: 'Elasticontent',
      logo: 'https://www.iconsdb.com/icons/preview/purple/rocket-xxl.png',
    },
    new: false,
    active: false,
    starred: true,
    title: 'Briefing mês de julho 01',
    datetime: new Date(),
    responsible: {
      id: '1',
      name: 'Drieli Lopes',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvL8VK49O_3-UUwrUQhbfs_pnXTBGBYjm40g&usqp=CAU',
    },
    status: 'PRODUCTION',
    description: 'Esse é o conteúdo que será abordado durante o mês de julho',
  },
  {
    id: generateId(),
    company: {
      id: '2',
      name: 'Robo Laura',
      logo:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAbFBMVEX2ewD////2dAD2dgD5r3b1cQD2eQD7xp75toL7xZ/5s3v+9en2gAD+8OD2hAD//vv97Nn96NL82br938P95cz7w5b4nU74m0n6vI/7zaX5qmv4l0D4kzP3ix/6vIr++O/7zav81bH4pWH4oVk0E/EgAAAChElEQVRoge2Z7ZaqIBhGBYSa8qPUMD/KzPu/xwFFyo4nfR1srZnF/keZeyECL0+OY7FY/g4MK9Z0ePuOZEUL81CHT63ESkxLgg9ICFeSw3oSRmslOS6SMLlg0AmCjXKgaMGMZ5Sk51sUxS2J5Cg4tPgd+ypEmjNcQssIwSgZuBsZULFg3GkMdSBOgA58AjsyaEf0/JpPDX5YGDogVQ6fI3QPEIT7KCfQ8Xha8hBKTm5+FzRNwzlP07QQlC0XSRAEDqYE+vJKSdo7XIpJD/sfcIGE5Mqx6rrqKkn0CclmxSLHSqzESuASVbLoU05fwqg2U03YSvwiwdcoOfiHJNp0t3m0268Zl03/GOcgy4uEVv2i7LFhu12ByU61vkAP91Wia6uglZBwINUS2Ai+Pi69hV3kTRkbSs1IyJ+RfGRM5r5dPxv4zK/CMKz8WM2Tvt2dFcxIZM0jahWC+x1/2DYkceRoDyufp7Y5yburrcRKrORzkrGTTv+ZKYnHiahVHmctItYtXFyYSQkrUZjcrvfiEnieF1zKZreJK+R2izLZGpGQBo2xNSPJ3krORiWP0/AAt6/1fiaplSQIxyQFMykRb2u5y+LjXuy6CMmNN6mv3FFVqSmJ0262VCUPssDGWE8dnSgtlPyTKo5FEMYlY/wKSf3re9KnRLMCHLxZJrmrn80KxnGtroaFz6xQPwtnRHJMZ4ku6Mz4CFMjOe3eQqnO6jksw3ucSMLo9vWWWp8j1MFivgSeb8OzRP16QThB4wtQMKwAPi3RlfFt6h07eA6Dd9O3HQD+P0BCm2r6zk/9WBbuErY9zDT4J29pZiU2QC/Nt1O4PKB4YZTeeRiZZmlYb7FYPs03HqAr6wyjArYAAAAASUVORK5CYII=',
    },
    new: false,
    active: false,
    starred: true,
    title: 'Briefing mês de julho 01',
    datetime: new Date(),
    responsible: {
      id: '1',
      name: 'Drieli Lopes',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvL8VK49O_3-UUwrUQhbfs_pnXTBGBYjm40g&usqp=CAU',
    },
    status: 'PRODUCTION',
    description: 'Esse é o conteúdo que será abordado durante o mês de julho',
  },
];

API.fetchGoals = function () {
  return new Promise((res) => {
    setTimeout(function () {
      res(goals);
    }, 2000);
  });
};

API.fetchInbox = function () {
  return new Promise((res) => {
    setTimeout(function () {
      res(inbox);
    }, 500);
  });
};

API.saveTodo = function (name) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const todo = {
        id: generateId(),
        name: name,
        complete: false,
      };
      inbox = inbox.concat([todo]);
      fail() ? rej(todo) : res(todo);
    }, 300);
  });
};

API.saveGoal = function (name) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const goal = {
        id: generateId(),
        name: name,
      };
      goals = goals.concat([goal]);
      fail() ? rej(goal) : res(goal);
    }, 300);
  });
};

API.deleteGoal = function (id) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      goals = goals.filter((goal) => goal.id !== id);
      fail() ? rej() : res(goals);
    }, 300);
  });
};

API.deleteTodo = function (id) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      inbox = inbox.filter((todo) => todo.id !== id);
      fail() ? rej() : res(inbox);
    }, 300);
  });
};

API.saveTodoToggle = function (id) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      inbox = inbox.map((todo) =>
        todo.id !== id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
      );

      fail() ? rej() : res(inbox);
    }, 300);
  });
};

module.exports = API;
