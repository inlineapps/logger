module.exports = (record, levelName) => {
  const detail = [err, req, res]
    .map(fn => fn(record))
    .filter(Boolean)
    .map(msg => `(${msg})`)
    .join(' ') + ' ';
  return {
    text: `${record.hostname} ${record.name}:${record.version} [${levelName}] ${record.msg} ${detail}(file: ${record.src.file}:${record.src.line} ${record.src.func})`
  };
};

function err(record) {
  if (record.err) {
    return `err: ${record.err.message}`;
  }
}

function req(record) {
  if (record.req) {
    return `req: ${JSON.stringify(record.req)}`;
  }
}

function res(record) {
  if (record.res) {
    return `res: ${JSON.stringify(record.res)}`;
  }
}
