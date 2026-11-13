import type { MaybePromise } from '../../internal/types.js'
import type { Algorithms } from './Constants.js'

/** RFC 9421 algorithms implemented by the HTTP message signature signer and verifier. */
export type SignatureAlgorithm = (typeof Algorithms)[keyof typeof Algorithms]

/** A local private key or external signer for RFC 9421 HTTP message signatures. */
export type SigningKey =
  | CryptoKey
  | {
      /** RFC 9421 algorithm used by the external signer. */
      algorithm: SignatureAlgorithm
      /** Signs the complete UTF-8 signature base and returns the raw signature bytes. */
      sign: (bytes: Uint8Array) => Promise<Uint8Array>
    }

/** Resolves a trusted public key for a parsed request signature. */
export type KeyResolver = (parameters: {
  /** RFC 9421 algorithm declared by the signature. */
  algorithm: SignatureAlgorithm
  /** Key identifier declared by the signature. */
  keyId: string
  /** Request carrying the signature. */
  request: Request
}) => MaybePromise<CryptoKey | undefined>

/** Values shared by every signature on one HTTP attempt. */
export type SigningContext = {
  /** Unix timestamp, in seconds, at which the attempt was created. */
  readonly created: number
  /** Base64url-encoded random value identifying the attempt. */
  readonly nonce: string
}
