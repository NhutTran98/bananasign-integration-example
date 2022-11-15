export default async function auth() {
  const { OpenIDProvider, SalteAuth } = await import('@salte-auth/salte-auth');
  const { Tab } = await import('@salte-auth/tab');

  class LuminProvider extends OpenIDProvider {
    get name() {
      return 'lumin'
    }
  
    get login() {
      return this.url(`${process.env.NEXT_PUBLIC_BANANASIGN_OAUTH2_ENDPOINT}/oauth2/auth`, {
        ref: this.config.ref,
      })
    }
  
    get logout() {
      return this.url(`${process.env.NEXT_PUBLIC_BANANASIGN_OAUTH2_ENDPOINT}/oauth2/sessions/logout`, {
        ref: this.config.ref,
      })
    }
  }

  return new SalteAuth({
    level: 'info',
    providers: [
      new LuminProvider({
        clientID: process.env.NEXT_PUBLIC_BANANASIGN_CLIENTID,
        scope: 'openid bananasign:document.write',
        responseType: 'code',
        ref: 'bananasign-integration-example',
        redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/verify`,
      }),
    ],
    handlers: [
      new Tab({
        navigate: "history",
        default: true,
      }),
    ],
  });
  
}
