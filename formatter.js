module.exports = (record, levelName) => {
  const detail = JSON.stringify(record, null, 2);
  const text = `${record.msg}\n${detail}`;
  return {
    attachments: [
      text
    ]
  };
};
