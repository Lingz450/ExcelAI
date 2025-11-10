# Security Policy

## 🔒 Reporting a Vulnerability

We take the security of ExcelAI seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please Do NOT:
- ❌ Open a public GitHub issue
- ❌ Discuss the vulnerability publicly
- ❌ Test the vulnerability on production systems

### Please DO:
- ✅ Email us at **security@excelai.com** with details
- ✅ Provide a detailed description of the vulnerability
- ✅ Include steps to reproduce (if possible)
- ✅ Give us reasonable time to respond before disclosure

## 📧 Reporting Process

Send your report to: **security@excelai.com**

Include the following information:

1. **Type of vulnerability** (e.g., XSS, SQL injection, authentication bypass)
2. **Affected component** (e.g., upload system, authentication, API endpoint)
3. **Steps to reproduce** the vulnerability
4. **Potential impact** of the vulnerability
5. **Suggested fix** (if you have one)
6. **Your contact information** for follow-up questions

## ⏱️ Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Varies based on severity (1-30 days)
- **Public Disclosure**: After fix is deployed and users have had time to update

## 🏆 Security Researcher Recognition

We appreciate the work of security researchers who help keep ExcelAI safe. With your permission, we will:

- Acknowledge your contribution in our CHANGELOG
- Add you to our Hall of Fame (if you wish)
- Provide a reference letter for your work (upon request)

## 🛡️ Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | ✅ Yes            |
| < 1.0   | ❌ No             |

## 🔐 Security Best Practices

### For Users

1. **Keep your installation up to date**
   - Enable automatic updates if possible
   - Check for updates regularly

2. **Use strong API keys**
   - Never share your API keys
   - Rotate keys regularly
   - Use environment variables, never hardcode

3. **Enable authentication**
   - Use OAuth providers (Google, Microsoft)
   - Enable 2FA where possible

4. **Monitor your usage**
   - Review audit logs regularly
   - Set up alerts for unusual activity

### For Developers

1. **Never commit sensitive data**
   - Use `.env.local` for secrets
   - Check `.gitignore` before committing
   - Use tools like `git-secrets`

2. **Validate all inputs**
   - Sanitize user inputs
   - Validate file uploads
   - Check file types and sizes

3. **Follow secure coding practices**
   - Use parameterized queries
   - Implement proper error handling
   - Avoid exposing stack traces

4. **Keep dependencies updated**
   - Run `npm audit` regularly
   - Update vulnerable packages promptly
   - Use Dependabot for automated updates

## 🔍 Known Security Considerations

### File Upload Security
- **Maximum file size**: 100MB (configurable)
- **Allowed file types**: .xlsx, .xlsm, .xls only
- **File validation**: Type and size checked before processing
- **Automatic cleanup**: Files deleted after 24 hours
- **Virus scanning**: Recommended for production (not included by default)

### API Security
- **Rate limiting**: Implemented per user tier
- **Authentication**: Required for all API endpoints
- **Input validation**: All inputs validated and sanitized
- **CORS**: Configured for specific domains only

### Data Privacy
- **Encryption**: Files encrypted during upload and storage
- **Data retention**: 24 hours by default
- **No training**: Your data is never used for AI model training
- **Compliance**: GDPR-compliant data handling

## 🚨 Security Incidents

In the event of a security incident:

1. We will investigate immediately
2. Affected users will be notified within 72 hours
3. A detailed incident report will be published
4. Fixes will be deployed as soon as possible
5. Post-mortem analysis will be conducted

## 📋 Security Checklist for Production

Before deploying to production, ensure:

- [ ] All environment variables are set correctly
- [ ] Database credentials are secure
- [ ] API keys are rotated regularly
- [ ] HTTPS is enabled
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled
- [ ] File upload restrictions are in place
- [ ] Logging and monitoring are configured
- [ ] Backup systems are in place
- [ ] Incident response plan is documented

## 🔗 Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Next.js Security Headers](https://nextjs.org/docs/advanced-features/security-headers)
- [Python Security Guide](https://python.readthedocs.io/en/stable/library/security_warnings.html)

## 📞 Contact

- **Security Issues**: security@excelai.com
- **General Support**: support@excelai.com
- **GitHub Issues**: [GitHub Issues](https://github.com/Lingz450/ExcelAI/issues) (for non-security issues only)

## 📜 Security Updates

Subscribe to security updates:
- **GitHub Watch**: Watch this repository for security advisories
- **Email List**: Subscribe at https://excelai.com/security-updates
- **RSS Feed**: https://github.com/Lingz450/ExcelAI/security/advisories.atom

---

**Last Updated**: November 2025

Thank you for helping keep ExcelAI and our users safe! 🙏

