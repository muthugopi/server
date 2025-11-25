
let visitors = [];

export const trackVisitor = (req, res) => {
  const { ip, device, browser } = req.body;

  const visitor = {
    id: visitors.length + 1,
    ip,
    device,
    browser,
    time: new Date().toISOString()
  };

  visitors.push(visitor);

  console.log("🔥 NEW VISITOR STORED:", visitor);

  res.json({ message: "Visitor saved!", visitor });
};

export const getVisitors = (req, res) => {
  res.json({
    total: visitors.length,
    visitors
  });
};
