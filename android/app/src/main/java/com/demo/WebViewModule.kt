package com.demo

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.view.View

class WebViewModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String = "WebViewModule"

    @ReactMethod
    fun showWebView() {
        (currentActivity as? MainActivity)?.runOnUiThread {
            (currentActivity as MainActivity).run {
                webView.visibility = View.VISIBLE
                webView.loadUrl("https://192.168.1.114:1337/test")
            }
        }
    }

    @ReactMethod
    fun hideWebView() {
        (currentActivity as? MainActivity)?.runOnUiThread {
            (currentActivity as MainActivity).webView.visibility = View.GONE
        }
    }
}