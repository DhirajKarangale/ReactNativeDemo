package com.demo

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

import android.os.Bundle
import android.view.View
import android.webkit.*
import android.widget.Button
import android.widget.LinearLayout
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import android.net.http.SslError
import android.view.ViewGroup
import android.view.KeyEvent


class MainActivity : ReactActivity() {

    public lateinit var webView: WebView
    public lateinit var layout: LinearLayout
    public var isWebViewAdded = false 

     override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        layout = LinearLayout(this)
        layout.orientation = LinearLayout.VERTICAL

        webView = WebView(this)
        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        webView.settings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
        webView.webViewClient = object : WebViewClient() {
            override fun onReceivedSslError(view: WebView?, handler: SslErrorHandler?, error: SslError?) {
                handler?.proceed()  // ✅ Bypass SSL error (for development only)
            }
        }

        webView.visibility = View.GONE  // ✅ Hide WebView initially
    }

    fun showWebView(url: String) {
        runOnUiThread {
            webView.loadUrl(url)
            webView.visibility = View.VISIBLE

            if (!isWebViewAdded) {
                addContentView(webView, ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.MATCH_PARENT
                ))
                isWebViewAdded = true
            }
        }
    }

    fun hideWebView() {
        runOnUiThread {
            webView.visibility = View.GONE
            sendEventToReactNative("onWebViewClosed")  // ✅ Notify React Native that WebView is closed
        }
    }

     override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            if (webView.visibility == View.VISIBLE) {
                if (webView.canGoBack()) {
                    webView.goBack()  // ✅ Go back in WebView if possible
                } else {
                    hideWebView()  // ✅ Close WebView if no back history
                }
                return true  // ✅ Prevent default back behavior
            }
        }
        return super.onKeyDown(keyCode, event)  // Default back action if WebView is already closed
    }

    private fun sendEventToReactNative(eventName: String) {
        val reactContext = this.reactInstanceManager?.currentReactContext
        reactContext?.let {
            it
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, null)
        }
    }



  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "demo"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, getMainComponentName(), fabricEnabled)
}
