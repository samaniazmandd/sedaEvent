//https://stackoverflow.com/questions/7536755/regular-expression-for-matching-hhmm-time-format
const time_regex = /([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
//https://www.freecodecamp.org/news/regex-for-date-formats-what-is-the-regular-expression-for-matching-dates/
const date_regex = /\d{1,2}\/\d{1,2}\/\d{2,4}/;
//https://regex101.com/library/SOgUIV
const email_regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;

function eventCheck(req, res, next) {
  const { title, date, time } = req.body;

  if (!title || !date || !time) {
    return res.status(400).json({
      error: "title, date and time are mandatory",
    });
  }

  if (!date_regex.test(date)) {
    return res.status(400).json({
      error: "date must be in DD/MM/YYYY format",
    });
  }

  if (!time_regex.test(time)) {
    return res.status(400).json({
      error: "time must be HH:MM (00:00-23-59)",
    });
  }

  next();
}

function idCheck(req, res, next) {
  const input = Number(req.params.id);
  const id = Number(input);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: "id must be positive number",
    });
  }

  next();
}

function userCheck(req, res, next) {
  const { email, password, mobile_phone, city } = req.body;
  if (!email_regex.test(email)) {
    return res.status(400).json({
      error: "Invalid email format",
    });
  }
  if (!password || !mobile_phone || !city) {
    return res.status(400).json({
      error: "password , mobile phone and city are required",
    });
  }

  next();
}

export { eventCheck, idCheck, userCheck };
