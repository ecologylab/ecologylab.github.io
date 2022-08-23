package phoneemulator;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;

/**
 *
 * Special Sublcass of SimplePhone designed to handle Swing thread
 * safty. Users of this class should register CallEventListeners
 * to handel incoming phone events. <br>
 * 
 * setTargetRciver(Phone) should be invoked before any sendCallEvent(evt)
 * calls are made.<br>
 * 
 * To send Call Events use the 
 * sendCallEvent(evt) function <br>
 * 
 * 
 * Typical usage when used with the SimplePhoneEmulator may
 * look something like this...
 * <br>
 * 
 * SimpleSwingPhone myphone = new SimpleSwingPhone("979-255-2222");<br>
 * SimplePhoneEmulator emu = new SimplePhoneEMulator();<br>
 * 
 * myphone.setTargetReciver(emu); <br>
 * myphone.addCallEventListener(this); <br>
 * 
 * emu.setTargetReciver(myphone); <br>
 * emu.startEmulator(); <br>
 * 
 * --start a new call--
 * CallEvent evt = new CallEvent(myphone, CallEvent.BEGIN, myphone.getMyNumber, "979-255-1111");<br>
 * myphone.sendCallEvent(evt);<br>
 * 
 * --end a current call--
 * CallEvent evt = new CallEvent(myphone, CallEvent.END, myphone.getMyNumber, myphone.getCurrentCallNumber());<br>
 * myphone.sendCallEvent(evt);<br>
 * 
 * --Accept an incomming call--
 * CallEvent evt = new CallEvent(myphone, CallEvent.BEGIN, myphone.getMyNumber, myphone.getCurrentCallNumber());<br>
 * myphone.sendCallEvent(evt);<br>
 * 
 * @author Daniel J. Caruso
 * 
 */
public class SimpleSwingPhone extends SimplePhone
{
	
	private ArrayList callListeners = null;
	
	public SimpleSwingPhone(String phoneNumber)
	{
		super();
		this.callListeners = new ArrayList();
		this.setMyNumber(phoneNumber);
	}
	
	
	public void addCallEventListener(SwingCallEventListener listener)
	{
		this.callListeners.add(listener);
	}
	
	/**
	 * @see SimplePhone#callConnected(CallEvent)
	 */
	void callConnected(CallEvent e)
	{

		CallEvent evt = e;
		
		class SimpleInvoker implements Runnable
		{
			CallEvent e;
			
			SimpleInvoker(CallEvent e)
			{
				this.e = e;

			}
			public void run()
			{
				callListeners.trimToSize();
				Object list[] = callListeners.toArray();
				for(int i=0; i<list.length; i++)
				{
				  SwingCallEventListener el = (SwingCallEventListener) list[i];
					el.callConnected(e);
				}
			
				return;
			}				
		}
		try
		{
			javax.swing.SwingUtilities.invokeAndWait(new  SimpleInvoker(e));
		}
		catch (InterruptedException ev)
		{
		}
		catch (InvocationTargetException ev)
		{
		}
		
	}
	
	/**
	 * @see SimplePhone#callEnded(CallEvent)
	 */
	void callEnded(CallEvent e)
	{
		class SimpleInvoker implements Runnable
		{
			CallEvent e;
			
			SimpleInvoker(CallEvent e)
			{
				this.e = e;

			}
			public void run()
			{
				callListeners.trimToSize();
				Object list[] = callListeners.toArray();
				for(int i=0; i<list.length; i++)
				{

					SwingCallEventListener el = (SwingCallEventListener) list[i];
					el.callEnded(e);

				}
			}				
		}
		try
		{	
				javax.swing.SwingUtilities.invokeAndWait(new  SimpleInvoker(e));
		}
		catch (InterruptedException ev)
		{
		}
		catch (InvocationTargetException ev1)
		{
		}
		

	}
	
	/**
	 * @see SimplePhone#incomingCall(CallEvent)
	 */
	void incomingCall(CallEvent e)
	{		
		class SimpleInvoker implements Runnable
		{
			CallEvent e;
			
			SimpleInvoker(CallEvent e)
			{
				this.e = e;

			}
			public void run()
			{
				callListeners.trimToSize();
				Object list[] = callListeners.toArray();
				for(int i=0; i<list.length; i++)
				{				
					SwingCallEventListener el = (SwingCallEventListener) list[i];
					el.callIncomming(e);
				}
			}				
		}
		try
		{
			javax.swing.SwingUtilities.invokeAndWait(new  SimpleInvoker(e));
		}
		catch (InterruptedException ev)
		{
		}
		catch (InvocationTargetException ev)
		{
		}
	}
	
}
