const { DOMParser, XMLSerializer } = require("xmldom");

const validateXHTML = (req, res, next) => {
  const { text } = req.body;

  try {
    const doc = new DOMParser().parseFromString(
      `<root>${text}</root>`,
      "application/xml"
    );

    const serializedText = new XMLSerializer().serializeToString(doc);

    if (serializedText !== `<root>${text}</root>`) {
      return res.status(400).json({ error: "Invalid XHTML content." });
    }

    next();
  } catch (error) {
    return res.status(400).json({ error: "Invalid XHTML content." });
  }
};

module.exports = validateXHTML;
