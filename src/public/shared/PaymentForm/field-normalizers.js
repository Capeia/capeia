// @flow

export const normalizeAmount = (value: string) => {
  if (!value) return value
  return String(value).replace(/[^\d]|-/g, '').slice(0, 4)
}

export const normalizeCardExpiration = (value: string, previousValue: ?string) => {
  if (!value) return value
  const raw = value.replace(/[^\d]/g, '')
  if (!previousValue || value.length > previousValue.length) {
    if (raw.length === 2) {
      return raw + ' / '
    }
  }
  if (raw.length === 1 && Number(raw) > 1) {
    return `0${raw} / `
  } else if (raw.length <= 2) {
    return raw
  } else if (raw.length <= 6) {
    return raw.slice(0, 2) + ' / ' + raw.slice(2)
  }
}

export const normalizeCardNumber = (value: string) => {
  if (!value) return value
  // since there's no way to reliably format credit card PANs, we only strip
  // anything other than digits, spaces and dashes.
  const filtered = value.replace(/[^\d -]/g, '')
  return filtered
}

export const normalizeCardCVC = (value: string) => {
  const filtered = value.replace(/[^\d]/g, '')
  return filtered.slice(0, 4)
}
