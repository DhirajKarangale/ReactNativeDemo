package com.reactnativedemo

import android.os.Bundle
import android.view.View
import android.view.ViewGroup
import android.webkit.*
import android.widget.LinearLayout
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.net.http.SslError
import android.util.Log
import android.view.KeyEvent
import com.facebook.react.bridge.WritableMap

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
                handler?.proceed()  
            }
        }

        webView.visibility = View.GONE  
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
            sendEventToReactNative("onWebViewClosed") 
        }
    }


    override fun getMainComponentName(): String = "ReactNativeDemo"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, getMainComponentName(), fabricEnabled)

     
     
    override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            if (webView.visibility == View.VISIBLE) {
                hideWebView() 
                return true  
            }
        }
        return super.onKeyDown(keyCode, event)  
    }

    private fun sendEventToReactNative(eventName: String) {
        val reactContext = this.reactInstanceManager?.currentReactContext
        reactContext?.let {
            it
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, null)
        }
    }

}
